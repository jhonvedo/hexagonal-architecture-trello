"use client";
import { useSearchParams, usePathname, redirect } from "next/navigation";
import Link from "next/link";
import { createCard } from "@/app/actions";

function Modal() {
    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const pathname = usePathname();

    const onchangeHandler = async (form: FormData) => {
        let response = await createCard(form);
        alert(response.message);
        redirect(pathname)
    };

    return (
        <>
            {modal && (
                <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="bg-white m-auto p-8">
                        <div className="flex flex-col items-center">
                            <p>Crear Tarjeta</p>
                            <br />
                            <form className="max-w-sm mx-auto" action={onchangeHandler}>
                                <div className="mb-5">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                                        Titulo
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                        Descripción
                                    </label>
                                    <textarea                                      
                                        id="description"
                                        name="description"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                >
                                    Guardar
                                </button>
                            </form>

                            <Link href={pathname}>
                                <button type="button" className="bg-red-500 text-white p-2 mt-6">
                                    Cerrar
                                </button>
                            </Link>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

export default Modal;
