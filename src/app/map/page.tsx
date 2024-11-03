'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import CafeCard from '../_components/CafeCard';
import { useCafeListStore } from '../store/cafeStore';

export default function Map() {
  const mapRef = useRef<null | naver.maps.Map>(null);
  const { filteredCafes } = useCafeListStore();

  useEffect(() => {
    const initMap = () => {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5513332, 126.9133705), // 초기 중심 위치 설정
        zoom: 14,
      };

      const map = new naver.maps.Map('map', mapOptions);
      mapRef.current = map;

      // 필터링된 카페들의 마커 추가
      addCafeMarkers(map);
    };

    const addCafeMarkers = (map: naver.maps.Map) => {
      if (filteredCafes.length > 0) {
        filteredCafes.forEach((cafe) => {
          const cafeLocation = new naver.maps.LatLng(
            cafe.latitude,
            cafe.longitude
          );
          const marker = new naver.maps.Marker({
            position: cafeLocation,
            map: map,
            title: cafe.cafe_name,
          });

          // 마커 클릭 시 정보 창 표시
          const infoWindow = new naver.maps.InfoWindow({
            content: `<div style="padding:10px;max-width:200px;">
              <h3 style="color: black; font-size: 12px;">${cafe.cafe_name}</h3>
            </div>`,
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
          });
        });
      }
    };

    // 네이버 지도 API 스크립트 로드
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => initMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_ID_KEY}`;
      document.head.appendChild(mapScript);
    }
  }, [filteredCafes]);

  // 현재 위치로 지도 중심 이동
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        if (mapRef.current) {
          mapRef.current.setCenter(currentLocation);
        }
      });
    }
  };

  return (
    <div className="flexCenter relative h-full w-full">
      <div id="map" className="h-full w-full"></div>
      <button
        onClick={handleCurrentLocationClick}
        className="absolute left-5 top-5 rounded border-gray-300 bg-gray-300 p-2"
      >
        <Image
          src={'/icons/myLocation.svg'}
          alt="내 위치 찾기"
          width={25}
          height={25}
        />
      </button>
      <div className="absolute bottom-10 w-full px-5">
        <ul className="scrollbar-hide flex flex-row space-x-4 overflow-x-scroll">
          {filteredCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </ul>
      </div>
    </div>
  );
}
