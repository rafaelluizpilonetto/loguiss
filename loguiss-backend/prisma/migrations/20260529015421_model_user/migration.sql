-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha_pdv" TEXT NOT NULL,
    "tipo_user" VARCHAR(1) NOT NULL,
    "telefone" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);
