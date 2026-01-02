"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Activity, Itinerary } from "./ChatBox";
import { useTripDetail } from "@/app/provider";

function GlobalMap() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    

    // @ts-ignore
    const { tripDetailInfo } = useTripDetail();

    // INIT MAP (ONCE)
    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-74.5, 40],
            zoom: 2,
            projection: "globe",
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, []);

    // UPDATE MARKERS WHEN DATA CHANGES
    useEffect(() => {
        if (!mapRef.current || !tripDetailInfo?.itinerary) return;

        // remove existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        tripDetailInfo.itinerary.forEach((itinerary: Itinerary) => {
            itinerary.activities.forEach((activity: Activity) => {
                const { longitude, latitude } = activity.geo_coordinates || {};

                if (longitude && latitude) {
                    const marker = new mapboxgl.Marker({ color: "red" })
                        .setLngLat([longitude, latitude])
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 }).setText(
                                activity.place_name
                            )
                        )
                        .addTo(mapRef.current!);

                    markersRef.current.push(marker);

                    const coordinates = [activity.geo_coordinates.longitude,activity.geo_coordinates.latitude] as [number,number]
                    mapRef?.current?.flyTo({
                        center: coordinates,
                        zoom: 10,
                        essential: true,
                    });
                }
            });
        });
    }, [tripDetailInfo]);

    return (
        <div className="w-full h-[80vh] rounded-2xl overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />
        </div>
    );
}

export default GlobalMap;
