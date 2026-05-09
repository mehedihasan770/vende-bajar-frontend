import React from 'react';

const WishlistPage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-secondary mb-4">My Wishlist</h1>
            <p className="text-gray-500 text-center max-w-md">
                You haven't added anything to your wishlist yet. Save your favorite items here to buy them later!
            </p>
            <button className="mt-8 px-8 py-3 bg-secondary text-white rounded-xl font-bold shadow-lg hover:bg-secondary/90 transition-all hover:scale-105">
                Explore Products
            </button>
        </div>
    );
};

export default WishlistPage;
