'use server';

import { db } from '@/lib/db'; 
import { ilike, or } from 'drizzle-orm';
import { untCourses } from '@/db/schema';
import { auth } from '@/auth';

export async function getProfessorsBySearch(searchTerm: string) {
    // Auth check - only allow logged in @my.unt.edu users
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    if (!searchTerm) return [];

    try {
        const results = await db.select().from(untCourses).where(
            or(
                ilike(untCourses.professorName, `%${searchTerm}%`),
                ilike(untCourses.courseName, `%${searchTerm}%`),
                ilike(untCourses.courseCode, `%${searchTerm}%`)
            )
        );        
        return results;
    } catch (error) {
        console.error("Search failed:", error);
        return [];
    }
}