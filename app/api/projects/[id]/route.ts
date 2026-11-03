import { projects } from "@/lib/projects-db";
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    
    const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
      return NextResponse.json(
          { message: 'Invalid project ID' },
          { status: 400 }
      );
  }
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
      return NextResponse.json(
            { message: 'Project not found' },
            { status: 404 }
        );
  }

  return NextResponse.json(project);
}