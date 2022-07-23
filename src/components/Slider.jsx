import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import Spinner from './Spinner'
import {db} from '../firebase.config'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {

    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()


    useEffect(() => {
        const fetchListing = async () => {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
        const querySnap = await getDocs(q)

        let listings = []
            querySnap.forEach((doc) => {
            console.log('Checking doc ', doc.data())
            return listings.push({
                id: doc.id,
                data: doc.data(),
            })
        })
            
            console.table('LISTING ',listings)
            console.table('listing data',listings.data)

        setListings(listings)
        setLoading(false) 
        }
        
        fetchListing()
    }, [])


    if (loading) {
        return <Spinner />
    }

    return (
        listings && (
          <>
            <p className='exploreHeading'>Recommended</p>
    
            <Swiper slidesPerView={1} pagination={{ clickable: true }}>
              {listings.map(({ id, data }) => (
                <SwiperSlide
                  key={id}
                  onClick={() => navigate(`/category/${data.type}/${id}`)}
                >
                  <div
                    style={{
                      background: `url(${data.imgUrls}) center no-repeat`,
                              backgroundSize: 'cover',
                              minHeight: '20rem'
                    }}
                    className='swiperSlideDiv'
                  >
                    <p className='swiperSlideText'>{data.name}</p>
                    <p className='swiperSlidePrice'>
                              ${data.discountedPrice ?? data.regularPrice}
                              {' '}
                              {data.type === 'rent' && '/ month'}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )
      )

}

export default Slider