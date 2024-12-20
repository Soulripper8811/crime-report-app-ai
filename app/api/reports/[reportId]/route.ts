import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import your authOptions

export async function PATCH(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    // Validate session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate params.reportId
    const { reportId } = params;
    if (!reportId) {
      return NextResponse.json({ error: "Invalid report ID" }, { status: 400 });
    }

    // Parse JSON body
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json(
        { error: "Missing or invalid status" },
        { status: 400 }
      );
    }

    // Update the report in the database
    const report = await prisma.report.update({
      where: { id: reportId },
      data: { status },
    });

    // Return the updated report
    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Error updating report" },
      { status: 500 }
    );
  }
}
