// components/product/ProductTabs.tsx
'use client';

// এই কম্পোনেন্টের নিজস্ব টাইপ
interface ProductTabsProps {
  product: {
    description: string;
    specifications: {
      [key: string]: string | string[] | number | undefined;
    };
    sku: string;
    category: string;
    videoUrl?: string;
  };
  activeTab: 'description' | 'specifications';
  setActiveTab: (tab: 'description' | 'specifications') => void;
}

export const ProductTabs = ({ product, activeTab, setActiveTab }: ProductTabsProps) => {

  // স্পেসিফিকেশন অবজেক্টকে অ্যারে তে কনভার্ট
  const specificationsArray = Object.entries(product.specifications || {});

  return (
    <div className="mt-8 sm:mt-10 lg:mt-12">
      <div className="border-b border-gray-200">
        <div className="flex gap-4 sm:gap-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-2 sm:py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'description'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-accent'
            }`}
          >
            বিবরণ
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`py-2 sm:py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'specifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-accent'
            }`}
          >
            স্পেসিফিকেশন
          </button>
        </div>
      </div>

      <div className="py-5 sm:py-6">
        {activeTab === 'description' && (
          <div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            {product.videoUrl && (
              <div className="mt-4">
                <h3 className="font-semibold text-accent mb-2">প্রোডাক্ট ভিডিও</h3>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={product.videoUrl.replace('watch?v=', 'embed/')}
                    title="Product Video"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {specificationsArray.map(([key, value]) => (
              <div key={key} className="flex py-2 border-b border-gray-100">
                <span className="w-1/2 text-sm font-medium text-accent">{key}</span>
                <span className="w-1/2 text-sm text-gray-600">
                  {Array.isArray(value) ? value.join(', ') : value}
                </span>
              </div>
            ))}
            <div className="flex py-2 border-b border-gray-100">
              <span className="w-1/2 text-sm font-medium text-accent">SKU</span>
              <span className="w-1/2 text-sm text-gray-600">{product.sku}</span>
            </div>
            <div className="flex py-2 border-b border-gray-100">
              <span className="w-1/2 text-sm font-medium text-accent">ক্যাটাগরি</span>
              <span className="w-1/2 text-sm text-gray-600">{product.category}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};