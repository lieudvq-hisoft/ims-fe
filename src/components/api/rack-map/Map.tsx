import React, { useState, useEffect } from 'react';
import locationService from '@/services/location';
import { useSession } from "next-auth/react";

interface Rack {
  id: number;
  column: number;
  row: number;
  size: number;
}

interface RackData {
  key: React.Key;
  id: number;
  name: string;
  rows: Array<Rack[]>;
}

interface LocationPageProps {
  onRefresh: () => void;
}

const LocationPage: React.FC<LocationPageProps> = ({ onRefresh }) => {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [rackData, setRackData] = useState<RackData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(session?.user.access_token);
        const data = await locationService.getRackData(session?.user.access_token!);
        // setRackData(() => data);
        
      } catch (error) {
        console.error('Error fetching rack data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      Test Map
    </div>
  );
}

export default LocationPage;
