import React from 'react';

const CartPage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-accent mb-4">Your Shopping Cart</h1>
            <p className="text-gray-500 text-center max-w-md">
                Your cart is currently empty. Start exploring our premium products and add them here!
            </p>
            <button className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all hover:scale-105">
                Start Shopping
            </button>
        </div>
    );
};

export default CartPage;
