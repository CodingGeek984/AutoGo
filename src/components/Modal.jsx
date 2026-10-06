import React from "react";

const Modal = ({ title, message, onClose, children }) => {

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
            onClick={onClose}
        >

            <div
                className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >

                <div className="flex items-start justify-between gap-6">

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h3>

                        {message && (
                            <p className="text-gray-500 mt-2">
                                {message}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-full bg-gray-100 px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-black transition"
                    >
                        ✕
                    </button>

                </div>

                {children && <div className="mt-6">{children}</div>}

            </div>

        </div>

    );

};

export default Modal;
