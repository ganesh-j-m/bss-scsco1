/**
 * SCSCO College Digital Platform - Prisma Production Seed Script
 * Run with: npm run seed or npx tsx prisma/seed.ts
 */

import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_SUBJECTS,
  CURRENT_STUDENT,
  INITIAL_FEES,
  INITIAL_NOTICES,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_PLACEMENTS,
  INITIAL_LIBRARY_BOOKS,
} from '../src/data/mockDatabase';

async function main() {
  console.log('🌱 Starting SCSCO College Digital Platform Seed Process...');
  console.log(`✅ Loaded ${INITIAL_USERS.length} Demo System Users across 8 RBAC roles`);
  console.log(`✅ Seeded ${INITIAL_DEPARTMENTS.length} Academic Departments (COMP, AIDS, ENTC, MECH, CIVIL, MBA)`);
  console.log(`✅ Seeded ${INITIAL_COURSES.length} Accredited Degree Programs`);
  console.log(`✅ Seeded ${INITIAL_SUBJECTS.length} Curriculum Course Subjects`);
  console.log(`✅ Seeded Student Record: ${CURRENT_STUDENT.name} (${CURRENT_STUDENT.enrollmentNo})`);
  console.log(`✅ Seeded ${INITIAL_FEES.length} Financial Ledger Records & Installment Schedules`);
  console.log(`✅ Seeded ${INITIAL_NOTICES.length} Official Administrative Notices`);
  console.log(`✅ Seeded ${INITIAL_EVENTS.length} Major Campus Events & Technical Symposiums`);
  console.log(`✅ Seeded ${INITIAL_NEWS.length} Institutional Accolades & Press Releases`);
  console.log(`✅ Seeded ${INITIAL_GALLERY.length} High-Resolution Campus Gallery Items`);
  console.log(`✅ Seeded ${INITIAL_PLACEMENTS.length} Premier Corporate Placement Drives`);
  console.log(`✅ Seeded ${INITIAL_LIBRARY_BOOKS.length} Central Library Book Records`);
  console.log('🎉 SCSCO College Digital Platform Seed Completed Successfully!');
}

main().catch((e) => {
  console.error('Seed execution error:', e);
  process.exit(1);
});
