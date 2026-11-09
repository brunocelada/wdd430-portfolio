import { getProjects } from "@/lib/projects-db";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const projects = await getProjects(type);
  return NextResponse.json(projects);
}

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//     const type = searchParams.get('type');

//     if (!type) {
//         return NextResponse.json(projects);
//     }

//     if (type !== 'opensource' && type !== 'school') {
//         return NextResponse.json(
//             { message: 'Invalid project type' },
//             { status: 400 }
//         );
//     }

//     const filteredProjects = projects.filter(
//         (project) => project.type === type
//     );

//     return NextResponse.json(filteredProjects);
// }