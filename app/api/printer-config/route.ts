import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// Rota GET: Buscar configurações de impressora do usuário logado
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user.tenantId;

  try {
    const configs = await prisma.printerConfig.findMany({
      where: { tenantId },
    });

    if (configs.length === 0) {
      return NextResponse.json({ message: 'No configurations found.' }, { status: 404 });
    }

    return NextResponse.json(configs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching configurations:', error);
    return NextResponse.json({ error: 'Error fetching configurations' }, { status: 500 });
  }
}

// Rota PUT: Atualizar configuração de impressora pelo id
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user.tenantId;

  try {
    const {
      id,
      paperSize,
      labelWidth,
      labelHeight,
      marginTop,
      horizontalSpacing,
      verticalSpacing,
      marginBottom,
      marginLeft,
      marginRight,
      titleFontSize,
      titleFontFamily,
      titleFontColor,
      titleBoldText,
      titleItalicText,
      titleUnderline,
      titleLineHeight,
      titleAlignment,
      bodyFontSize,
      bodyFontFamily,
      bodyFontColor,
      bodyBoldText,
      bodyItalicText,
      bodyUnderline,
      bodyLineHeight,
      bodyAlignment,
      rotation,
      barcodeEnabled,
      barcodeType,
      barcodePosition,
      labelBorder,
      borderColor,
      backgroundColor,
      customImageEnabled,
      imagePosition,
      imageOpacity,
      numberOfLabelsPerPage,
      cutLineEnabled,
      useCustomMargins,
      logoWidth,
      logoHeight,
      logoTop,
      logoLeft,
      labelsPerRow,
      labelsPerColumn,
      lineHeight,
    } = await request.json();

    const updatedConfig = await prisma.printerConfig.update({
      where: { id },
      data: {
        paperSize,
        labelWidth,
        labelHeight,
        marginTop,
        horizontalSpacing,
        verticalSpacing,
        marginBottom,
        marginLeft,
        marginRight,
        titleFontSize,
        titleFontFamily,
        titleFontColor,
        titleBoldText,
        titleItalicText,
        titleUnderline,
        titleLineHeight,
        titleAlignment,
        bodyFontSize,
        bodyFontFamily,
        bodyFontColor,
        bodyBoldText,
        bodyItalicText,
        bodyUnderline,
        bodyLineHeight,
        bodyAlignment,
        rotation,
        barcodeEnabled,
        barcodeType,
        barcodePosition,
        labelBorder,
        borderColor,
        backgroundColor,
        customImageEnabled,
        imagePosition,
        imageOpacity,
        numberOfLabelsPerPage,
        cutLineEnabled,
        useCustomMargins,
        logoWidth,
        logoHeight,
        logoTop,
        logoLeft,
        labelsPerRow,
        labelsPerColumn,
        lineHeight,
      },
    });

    return NextResponse.json(updatedConfig, { status: 200 });
  } catch (error: any) {
    console.error('Error saving configuration:', error);
    return NextResponse.json({ error: 'Error saving configuration' }, { status: 500 });
  }
}

// Rota DELETE: Excluir uma configuração de impressora pelo id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user.tenantId;
  const { id } = params;

  try {
    const config = await prisma.printerConfig.findUnique({
      where: { id },
    });

    if (!config || config.tenantId !== tenantId) {
      return NextResponse.json(
        { error: 'Configuração não encontrada ou não autorizada' },
        { status: 404 },
      );
    }

    await prisma.printerConfig.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Configuração excluída com sucesso' }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao excluir configuração:', error);
    return NextResponse.json({ error: 'Erro ao excluir configuração' }, { status: 500 });
  }
}

// Rota POST: Cria uma nova configuração de impressora
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user.tenantId;

  try {
    const {
      name,
      paperSize,
      labelWidth,
      labelHeight,
      marginTop,
      horizontalSpacing,
      verticalSpacing,
      marginBottom,
      marginLeft,
      marginRight,
      titleFontSize,
      titleFontFamily,
      titleFontColor,
      titleBoldText,
      titleItalicText,
      titleUnderline,
      titleLineHeight,
      titleAlignment,
      bodyFontSize,
      bodyFontFamily,
      bodyFontColor,
      bodyBoldText,
      bodyItalicText,
      bodyUnderline,
      bodyLineHeight,
      bodyAlignment,
      rotation,
      barcodeEnabled,
      barcodeType,
      barcodePosition,
      labelBorder,
      borderColor,
      backgroundColor,
      customImageEnabled,
      imagePosition,
      imageOpacity,
      numberOfLabelsPerPage,
      cutLineEnabled,
      useCustomMargins,
      logoWidth,
      logoHeight,
      logoTop,
      logoLeft,
      labelsPerRow,
      labelsPerColumn,
      lineHeight,
    } = await request.json();

    const newConfig = await prisma.printerConfig.create({
      data: {
        tenantId,
        name,
        paperSize,
        labelWidth,
        labelHeight,
        marginTop,
        horizontalSpacing,
        verticalSpacing,
        marginBottom,
        marginLeft,
        marginRight,
        titleFontSize,
        titleFontFamily,
        titleFontColor,
        titleBoldText,
        titleItalicText,
        titleUnderline,
        titleLineHeight,
        titleAlignment,
        bodyFontSize,
        bodyFontFamily,
        bodyFontColor,
        bodyBoldText,
        bodyItalicText,
        bodyUnderline,
        bodyLineHeight,
        bodyAlignment,
        rotation,
        barcodeEnabled,
        barcodeType,
        barcodePosition,
        labelBorder,
        borderColor,
        backgroundColor,
        customImageEnabled,
        imagePosition,
        imageOpacity,
        numberOfLabelsPerPage,
        cutLineEnabled,
        useCustomMargins,
        logoWidth,
        logoHeight,
        logoTop,
        logoLeft,
        labelsPerRow,
        labelsPerColumn,
        lineHeight,
      },
    });

    return NextResponse.json(newConfig, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar a nova configuração:', error);
    return NextResponse.json(
      { error: `Erro ao criar a nova configuração: ${error.message}` },
      { status: 500 },
    );
  }
}
