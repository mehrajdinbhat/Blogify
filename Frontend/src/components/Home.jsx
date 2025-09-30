import React from 'react'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import Devotional from '../home/Devotional'
import Creator from '../home/creator'


function Home() {
  return (
    <>
       <Hero />
       <Trending />
       <Devotional />
       <Creator/>
    </>
  )
}

export default Home