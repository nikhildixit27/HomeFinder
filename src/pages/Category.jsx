import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import Listingitem from '../components/ListingItem';
import { useParams } from 'react-router';

export default function Category() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);
    const params = useParams();

    useEffect(() => {
        async function fetchListings() {
            try {
                const listingRef = collection(db, "listings");
                const q = query(
                    listingRef,
                    where("type", "==", params.categoryName),
                    orderBy("timestamp", "desc"),
                    limit(8)
                );

                const querySnap = await getDocs(q)
                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                const listings = []
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error("Could not fetch the Listings")
            }
        }
        fetchListings()
    }, [params.categoryName])

    async function onFetchMoreListings() {
        try {
            const listingRef = collection(db, "listings");
            const q = query(
                listingRef,
                where("type", "==", params.categoryName),
                orderBy("timestamp", "desc"),
                limit(4),
                startAfter(lastFetchedListing)
            );

            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchedListing(lastVisible)

            const listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings((prevState) => [...prevState, ...listings]);
            setLoading(false)
        } catch (error) {
            toast.error("Could not fetch the Listings")
        }
    }

    return (
        <div className='max-w-6xl mx-auto px-3'>
            <h1 className='text-3xl text-center mt-6 font-bold mb-6 underline'>
                {params.categoryName === "rent" ? "Places for Rent" : "Places for Sale"}
            </h1>
            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                            {
                                listings.map((listing) => (
                                    <Listingitem key={listing.id} id={listing.id} listing={listing.data}
                                    />
                                ))
                            }
                        </ul>
                    </main>
                    {lastFetchedListing && (
                        <div className="flex justify-center items-center">
                            <button
                                onClick={onFetchMoreListings}
                                className="bg-red-600 px-3 py-1.5 font-semibold text-white border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p>There are no current {params.categoryName === "rent" ? "places for rent" : "places for sale"}</p>
            )
            }
        </div>
    )
}
