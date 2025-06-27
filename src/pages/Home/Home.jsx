import React from 'react';
import Banner from '../../shared/Banner';
import LatestCard from '../../shared/LatestCard';
import HowItWorks from '../../shared/HowItWorks';
import Testimonials from '../../shared/Testimonials';
import DiscountBanner from '../../shared/DiscountBanner';
import UpcomingEventCountdown from '../../shared/UpcomingEventCountdown';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestCard></LatestCard>
            <UpcomingEventCountdown></UpcomingEventCountdown>
            <DiscountBanner></DiscountBanner>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;