import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

import {
  FaShieldAlt,
  FaBolt,
  FaHandsHelping,
  FaSyncAlt,
  FaShareAlt,
  FaUsers
} from 'react-icons/fa';
import convertDriveLinkToDirect from '../../utilities/convertImg';

const sideCardsLeft = [
  {
    title: 'Connect',
    subtitle: 'Collaborate with Devs',
    icon: <FaUsers className="text-green-600 text-xl" />,
  },
  {
    title: 'Share',
    subtitle: 'Post Your Ideas',
    icon: <FaShareAlt className="text-pink-500 text-xl" />,
  },
  {
    title: 'Secure',
    subtitle: 'VPNs for Dev Privacy',
    icon: <FaShieldAlt className="text-blue-500 text-xl" />,
  },
];


const sideCardsRight = [
  {
    title: 'Reliable',
    subtitle: 'Fast & Private Access',
    icon: <FaBolt className="text-yellow-500 text-xl" />,
  },
  {
    title: 'Contribute',
    subtitle: 'Support Open Projects',
    icon: <FaHandsHelping className="text-yellow-500 text-xl" />,
  },
  {
    title: 'Seamless',
    subtitle: 'Lifetime Software Deals',
    icon: <FaSyncAlt className="text-red-500 text-xl" />,
  },
];

const banners = [
  {
    title: 'DevConnect',
    subtitle: 'Collaborate in real-time',
    desc: 'Build meaningful projects with fellow developers around the globe.',
    image:
      convertDriveLinkToDirect(
        'https://res.cloudinary.com/dsz09glns/image/upload/v1753379921/3568275767b92f560f2d707644c88254_fkkeen.jpg'
      ),
  },
  {
    title: 'Grow Together',
    subtitle: 'Contribute & Learn',
    desc: 'Engage in open-source projects and sharpen your skills daily.',
    image:
      convertDriveLinkToDirect(
        'https://res.cloudinary.com/dsz09glns/image/upload/v1753379921/b2340f9979388a91a2fa58df63f3809d_c3jvss.jpg'
      ),
  },
  {
    title: 'Team Up',
    subtitle: 'Find your perfect dev team',
    desc: 'Join forces with like-minded developers and launch your dream app.',
    image:
      convertDriveLinkToDirect(
        'https://res.cloudinary.com/dsz09glns/image/upload/v1753379921/11ea8603331a081c36e1fba0f46c0aa7_mxhocc.jpg'
      ),
  },
];


const Banner = () => {
  return (
    <div className="p-6 space-y-8 mt-18">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
        {/* Left Side Cards */}
        <div className="hidden lg:flex flex-col gap-4">
          {sideCardsLeft.map((card, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow flex flex-col items-center justify-center p-4 h-28 text-center"
            >
              {card.icon}
              <div className="text-base font-semibold mt-2">{card.title}</div>
              <div className="text-xs text-gray-600">{card.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="col-span-1 lg:col-span-3">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            className="rounded-xl overflow-hidden"
          >
            {banners.map((item, i) => (
              <SwiperSlide key={i}>
                <div
                  className="w-full h-92 bg-cover bg-center text-white flex flex-col items-center justify-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center p-4">
                    <h2 className="text-3xl font-bold">{item.title}</h2>
                    <p className="mt-2 text-lg font-semibold">
                      {item.subtitle}
                    </p>
                    <p className="text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Side Cards */}
        <div className="hidden lg:flex flex-col gap-4">
          {sideCardsRight.map((card, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow flex flex-col items-center justify-center p-4 h-28 text-center"
            >
              {card.icon}
              <div className="text-base font-semibold mt-2">{card.title}</div>
              <div className="text-xs text-gray-600">{card.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;