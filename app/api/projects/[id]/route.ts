import { NextResponse, NextRequest } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};


export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
    const { id } = await params;
    const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    
    const project = await getProjectById(projectId);
    
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

// export async function GET(
//   _request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//     const { id } = await params;
    
//     const projectId = Number(id);

//   if (!Number.isInteger(projectId) || projectId <= 0) {
//       return NextResponse.json(
//           { message: 'Invalid project ID' },
//           { status: 400 }
//       );
//   }
//   const project = projects.find((p) => p.id === projectId);
//   if (!project) {
//       return NextResponse.json(
//             { message: 'Project not found' },
//             { status: 404 }
//         );
//   }

//   return NextResponse.json(project);
// }