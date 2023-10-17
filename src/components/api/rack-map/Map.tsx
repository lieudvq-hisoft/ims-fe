"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useSelector from "@/hooks/use-selector";
import locationService from "@/services/location";
import { Space, Table, Modal, Alert } from "antd";

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
    rowCount: number;
    columnCount: number;
    racks: Rack[];
  }

interface RackMapProps {
    onRefresh: () => void;
}

const RackMap: React.FC<RackMapProps> = (props) => {
    const { data: session } = useSession();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [rackData, setRackData] = useState<RackData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = session?.user.access_token!;
        const data = await locationService.getRackData(token);
        setRackData(() => data);
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
      <button onClick={toggleCollapse}>
        {isCollapsed ? 'Expand' : 'Collapse'} Big Area
      </button>
      {!isCollapsed && rackData && (
        <div>
          {rackData.racks.map((rack, index) => (
            <div key={index}>
              <div>
                <strong>Rack ID: {rack.id}</strong>
              </div>
              <div>
                <strong>Row: {rack.row}</strong>, <strong>Column: {rack.column}</strong>
              </div>
              <div>
                <strong>Size: {rack.size}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RackMap;