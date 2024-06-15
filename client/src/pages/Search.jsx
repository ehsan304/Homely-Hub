import { useState } from 'react'

export default function Search() {
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    console.log(sidebardata)
    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sell'
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id })
        }

        if (
            e.target.id === 'searchTerm'
        ) {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value })
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({ ...sidebardata, sort, order })
        }
    };



    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type="text"
                            id='searchTerm'
                            className='border rounded-lg p-3 w-full'
                            placeholder='Search...'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                        <label className='font-semibold'>Types:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='all'
                                className='w-5'
                                checked={sidebardata.type === 'all'}
                                onChange={handleChange}
                            />
                            <span>Rent & Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='rent'
                                className='w-5'
                                checked={sidebardata.type === 'rent'}
                                onChange={handleChange}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='sell'
                                className='w-5'
                                checked={sidebardata.type === 'sell'}
                                onChange={handleChange}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='offer'
                                className='w-5'
                                checked={sidebardata.offer}
                                onChange={handleChange}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                        <label className='font-semibold'>Amenities:</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='parking'
                                className='w-5'
                                checked={sidebardata.parking}
                                onChange={handleChange} />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id='furnished'
                                className='w-5'
                                checked={sidebardata.furnished}
                                onChange={handleChange}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Sort:</label>
                        <select
                            defaultValue={'created_at_desc'}
                            onChange={handleChange}
                            className='border rounded-lg p-3' id="sort_order">
                            <option value='regularPrice_desc' >Price high to low</option>
                            <option value='regularPrice_asc' >Price low to high</option>
                            <option value='createdAt_desc' >Latest</option>
                            <option value='createdAt_asc' >Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-90'>Search</button>
                </form>
            </div>
            <div className="">
                <h1 className='text-3xl font font-semibold text-slate-700 border-b p-3 mt-5'>Listing Results:</h1>
            </div>
        </div>
    )
}