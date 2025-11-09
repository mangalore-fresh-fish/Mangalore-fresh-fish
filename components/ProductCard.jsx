'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className=' group max-xl:mx-auto'>
            {/* UPDATED: Fixed sm:h-68 to sm:h-64 */}
            <div className='bg-white h-40 sm:w-60 sm:h-64 rounded-lg flex items-center border border-gray-300 justify-center overflow-hidden'>
                {/* UPDATED: Fixed max-h-30 to max-h-32 */}
                <Image width={500} height={500} className='max-h-32 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300' src={product.images[0]} alt="" />
            </div>
            {/* UPDATED: Removed max-w-60 to allow text to flow naturally */}
            <div className='flex justify-between gap-3 text-sm text-slate-800 pt-2'>
                <div>
                    <p>{product.name}</p>
                    <div className='flex'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? '#FBBF24' : '#D1D5DB'} />
                        ))}
                    </div>
                </div>
                <p className='font-medium'>{currency}{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard