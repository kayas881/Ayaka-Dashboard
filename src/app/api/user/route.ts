import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongoose';
import User from '../../../../currencySchema';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ userId });
    return NextResponse.json(user);
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// 🔥 New POST method for equipping banner/color
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, equippedBanner, equippedColor } = body;

  if (!userId || (!equippedBanner && !equippedColor)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await dbConnect();
    const updateData: any = {};
    if (equippedBanner) updateData.equippedBanner = equippedBanner;
    if (equippedColor) updateData.equippedColor = equippedColor;

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('[API ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
