import { useState } from 'react';
import { toast } from 'sonner';

import { LayoutDashboard, Folder, Shuffle, Brain, Cog, Search, Pencil, Trash2 } from 'lucide-react';
import { SideBar } from '../components/sidebar';
import { Button } from '../components/button'
import { Inputs } from '../components/inputs';


function Produtos() {

    const menuItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/home",
            active: true,
        },
        {
            label: "Cadastros",
            icon: Folder,
            subMenu: [
                { label: "Produtos", 
                    subMenu: [
                        { label: "Produtos", href: "/produtos" },
                        { label: "Unidade de Medida", href: "/unidades-medida" },
                        { label: "Categorias", href: "/categorias" },
                    ],
                },
                { label: "Usuários", href: "/usuarios" },
                { label: "Clientes", href: "/clientes" },
                { label: "Fornecedores", href: "/fornecedores" },
            ],
        },
        {
            label: "Movimentações",
            icon: Shuffle,
            subMenu: [
                {
                    label: "Movimentações de saída",
                    href: "/movimentacoes-saida",
                },
                {
                    label: "Movimentações de entrada",
                    href: "/movimentacoes-entrada",
                },
            ],
        },
        {
            label: "Previsão IA",
            icon: Brain,
            subMenu: [
                {
                    label: "Previsão de demanda",
                    href: "/previsao-demanda",
                },
                {
                    label: "Configurações da IA",
                    href: "/configuracoes-ia",
                },
            ],
        },
        {
            label: "Configurações",
            icon: Cog,
            href: "/configuracoes",
        },
    ];  

    const [showProductForm, setShowProductForm] = useState(false);

    const [newProduct, setNewProduct] = useState({
        desc: "",
        categoria: "",
        minimo: "",
        unidade: "",
        valor: "",
        quantidade: "",
        fornecedor: "",
        dt_entrada: "",
        prazo_saida: "",
    });

    //CRUD de produtos
    const addNewProduct = () => {

        setProducts((produtosAtuais) => [
            ...produtosAtuais,
            newProduct
        ]);

        setShowProductForm(false);

        setNewProduct({
            desc: "",
            categoria: "",
            minimo: "",
            unidade: "",
            valor: "",
            quantidade: "",
            fornecedor: "",
            dt_entrada: "",
            prazo_saida: "",
        });
    };

    const editProduct = (index, updatedProduct) => {
        setProducts((produtosAtuais) => {
            const produtosAtualizados = [...produtosAtuais];
            produtosAtualizados[index] = updatedProduct;
            return produtosAtualizados;
        });
    };

    const deleteProduct = (index) => {
        setProducts((produtosAtuais) => {
            const produtosAtualizados = [...produtosAtuais];
            produtosAtualizados.splice(index, 1);
            return produtosAtualizados;
        });
    };
    
    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    return (

        <div className="min-h-screen bg-[#050212] text-white">

            <SideBar menuItems={menuItems} />

            <main className="ml-72 min-h-screen p-5">

                <div className="flex items-center justify-between mb-3">

                    <div> {/* Agrupa o título e a descrição para separá-los do botão no layout flex */}

                        <h1 className="text-3xl font-bold mb-2 mt-2">
                            Produtos
                        </h1>

                        <p className="text-gray-400">
                            Esta é a página de produtos. Aqui você pode gerenciar os produtos cadastrados no sistema.
                        </p>

                    </div>

                    <Button
                        type="button"
                        className="bg-[#4EDB4E] hover:bg-[#3CB43C] p-3 w-auto mt-2"
                        onClick={() => {
                                setEditingIndex(null);
                                setNewProduct({
                                    desc: "",
                                    categoria: "",
                                    minimo: "",
                                    unidade: "",
                                    valor: "",
                                    quantidade: "",
                                    fornecedor: "",
                                    dt_entrada: "",
                                    prazo_saida: "",
                                });
                                setShowProductForm(true);
                            }}
                    >
                        Adicionar novo produto
                    </Button>

                </div>

                <Inputs
                    type="text"
                    placeholder="Pesquisar produtos..."
                    className="mt-5 rounded-lg border bg-[#15102b] p-3 focus:border-[#4EDB4E] w-1/2"   
                    icon={Search}
                />

                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((produto, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-gray-800 bg-[#0d0920] p-5"
                        >
                            <h2 className="text-xl font-bold">
                                {produto.desc}
                            </h2>

                            <p className="mt-2 text-gray-400">
                                Categoria: {produto.categoria}
                            </p>

                            <p className="mt-1 text-gray-400">
                                Quantidade: {produto.quantidade}
                            </p>

                            <p className="mt-1 text-gray-400">
                                Valor: R$ {produto.valor}
                            </p>

                            <p className="mt-1 text-gray-400">
                                Fornecedor: {produto.fornecedor}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <Button
                                    type="button"
                                    className="mt-2 bg-green-600 p-3 hover:bg-green-700 justify-center"
                                    onClick={() => {
                                        setEditingIndex(index);
                                        setNewProduct(produto);
                                        setShowProductForm(true);
                                    }}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                </Button>

                                <Button
                                    type="button"
                                    className="mt-2 bg-red-600 p-3 hover:bg-red-700  justify-center"
                                    onClick={() => {
                                        if (window.confirm("Deseja excluir este produto?")) {
                                            deleteProduct(index);
                                            toast.success("Produto excluído com sucesso!");
                                        }
                                    }}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

            </main>

            {showProductForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

                    <div className="w-full max-w-2xl rounded-xl bg-[#0d0920] p-6 shadow-2xl">

                        <div className="mb-6 flex items-center justify-between">
                            <div>
                               <h2 className="text-2xl font-bold">
                                    {editingIndex !== null ? "Editar produto" : "Adicionar produto"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    {editingIndex !== null
                                        ? "Atualize os dados do produto."
                                        : "Preencha os dados do novo produto."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowProductForm(false)}
                                className="text-2xl text-gray-400 hover:text-white"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (editingIndex !== null) {
                                    editProduct(editingIndex, newProduct);
                                    toast.success("Produto atualizado com sucesso!");
                                } else {
                                    addNewProduct();
                                    toast.success("Produto cadastrado com sucesso!");
                                }

                                setEditingIndex(null);
                                setShowProductForm(false);
                            }}
                        >

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="sm:col-span-2">
                                    <label className="mb-1 block text-sm font-medium">
                                        Descrição
                                    </label>

                                    <input
                                        type="text"
                                        value={newProduct.desc}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                desc: e.target.value
                                            })
                                        }
                                        placeholder="Nome do produto"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Categoria
                                    </label>

                                    <input
                                        type="text"
                                        value={newProduct.categoria}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                categoria: e.target.value
                                            })
                                        }
                                        placeholder="Ex: Eletrônico"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Unidade
                                    </label>

                                    <input
                                        type="text"
                                        value={newProduct.unidade}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                unidade: e.target.value
                                            })
                                        }
                                        placeholder="Ex: UN"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Estoque mínimo
                                    </label>

                                    <input
                                        type="number"
                                        value={newProduct.minimo}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                minimo: e.target.value
                                            })
                                        }
                                        placeholder="0"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Quantidade
                                    </label>

                                    <input
                                        type="number"
                                        value={newProduct.quantidade}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                quantidade: e.target.value
                                            })
                                        }
                                        placeholder="0"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Valor
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newProduct.valor}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                valor: e.target.value
                                            })
                                        }
                                        placeholder="0,00"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Fornecedor
                                    </label>

                                    <input
                                        type="text"
                                        value={newProduct.fornecedor}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                fornecedor: e.target.value
                                            })
                                        }
                                        placeholder="Nome do fornecedor"
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Data de entrada
                                    </label>

                                    <input
                                        type="date"
                                        value={newProduct.dt_entrada}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                dt_entrada: e.target.value
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Prazo de saída
                                    </label>

                                    <input
                                        type="date"
                                        value={newProduct.prazo_saida}
                                        onChange={(e) =>
                                            setNewProduct({
                                                ...newProduct,
                                                prazo_saida: e.target.value
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-700 bg-[#15102b] p-3 text-white outline-none focus:border-[#4EDB4E]"
                                    />
                                </div>

                            </div>

                            <div className="mt-6 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => setShowProductForm(false)}
                                    className="rounded-lg bg-gray-700 px-5 py-3 font-bold text-white transition hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>

                                <Button
                                    type="submit"
                                    className="mt-0 w-auto bg-[#4EDB4E] px-5 py-3 hover:bg-[#3CB43C]"
                                >
                                    {editingIndex !== null ? "Salvar alterações" : "Cadastrar produto"}
                                </Button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>

    )
}

export default Produtos;