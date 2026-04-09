import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { untCourses } from '@/db/schema';
import { ilike } from 'drizzle-orm';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    // Auth check - only allow logged in @my.unt.edu users
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const nameQuery = searchParams.get('name');

    if (!nameQuery) {
        return NextResponse.json({ error: "No name provided" }, { status: 400 });
    }

    try {
        const results = await db.select()
            .from(untCourses)
            .where(ilike(untCourses.professorName, `%${nameQuery}%`));
        
        return NextResponse.json({
            page_id: "0",
            page_type: "Table",
            records: results.map((row) => ({
                row_id: row.id.toString(),
                values: [
                    row.id.toString(),
                    row.professorName,
                    row.courseCode,
                    row.courseName,
                    row.semester,
                    row.department
                ]
            }))
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}