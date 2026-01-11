import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../shared/Banner';
import LatestCard from '../../shared/LatestCard';
import HowItWorks from '../../shared/HowItWorks';
import Testimonials from '../../shared/Testimonials';
import DiscountBanner from '../../shared/DiscountBanner';
import UpcomingEventCountdown from '../../shared/UpcomingEventCountdown';
import FeaturedArticles from '../../shared/FeaturedArticles';
import FAQ from '../../shared/FAQ';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>HobbyHub | Home</title>
            </Helmet>
            <div>
            <Banner></Banner>
            <LatestCard></LatestCard>
            <UpcomingEventCountdown></UpcomingEventCountdown>
            <DiscountBanner></DiscountBanner>
            <FeaturedArticles></FeaturedArticles>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
        </div>
        </>
    );
};

export default Home;