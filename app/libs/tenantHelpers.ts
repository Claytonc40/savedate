// app/libs/tenantHelpers.ts

import prisma from './prismaDb';

// Função para obter o tenantId do tenant padrão
export async function getDefaultTenantId(): Promise<string> {
  // Busca o tenant padrão no banco de dados
  const defaultTenant = await prisma.tenant.findFirst({
    where: {
      name: 'Default Tenant', // nome do tenant padrão
    },
  });

  if (!defaultTenant) {
    throw new Error('Default tenant not found');
  }

  return defaultTenant.id; // retorna o ID do tenant
}
