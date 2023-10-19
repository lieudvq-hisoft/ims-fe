import React, { useState, useEffect } from 'react';
import locationService from '@/services/location';
import { useSession } from "next-auth/react";
import { useCollapse } from 'react-collapsed';
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import styles from "@/styles/map.module.css";
import { useRouter } from 'next/navigation';

interface Rack {
  id: number;
  column: number;
  row: number;
  size: number;
  areaId: number;
}

interface RackData {
  isExpanded: any;
  key: React.Key;
  id: number;
  name: string;
  rowCount: number;
  columnCount: number;
  racks: Rack[];
}

interface LocationPageProps {
  onRefresh: () => void;
}

const LocationPage: React.FC<LocationPageProps> = ({ onRefresh }) => {
  const { data: session } = useSession();
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: true });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [rackData, setRackData] = useState<RackData[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await locationService.getRackData(session?.user.access_token!);
        const areaGroups: { [key: number]: RackData } = {};

        getData.forEach((location) => {
          location.racks.forEach((rack: Rack) => {
            const areaId = rack.areaId;
            if (!areaGroups[areaId]) {
              areaGroups[areaId] = {
                key: `Area ${areaId}`,
                id: areaId,
                name: `${location.name}`,
                rowCount: location.rowCount,
                columnCount: location.columnCount,
                racks: [],
                isExpanded: false, // Initialize as collapsed
              };
            }
            areaGroups[areaId].racks.push(rack);
          });
        });
        const rackDataArray: RackData[] = Object.values(areaGroups);

        setRackData(rackDataArray);
      } catch (error) {
        console.error('Error fetching rack data:', error);
      }
    };

    fetchData();
  }, [session]);

  const toggleExpanded = (rackName: string) => {
    setRackData((prevRackData) => {
      if (!prevRackData) return prevRackData; // Handle the case where prevRackData is null
      return prevRackData.map((rack) => {
        if (rack.name === rackName) {
          // Toggle the 'isExpanded' property for the clicked group
          return { ...rack, isExpanded: !rack.isExpanded };
        }
        return rack;
      });
    });
  };

  return (
    <div>
      {rackData &&
        rackData.map((rackData) => (
          <div key={rackData.key.toString()} className={styles["collapsible-map"]}>
            <div className={styles["header-icon-map"]}{...getToggleProps()} onClick={() => toggleExpanded(rackData.name)}>
              <div className={styles["header-map"]}>
                {rackData.isExpanded ? (
                  <span>{`Khu ${rackData.name}`}</span>
                ) : (
                  <span>{`Khu ${rackData.name}`}</span>
                )}
              </div>
              <div className={styles["icon-map"]}>
                {rackData.isExpanded ? <DownOutlined /> : <UpOutlined />}
              </div>
            </div>
            {rackData.isExpanded && (
              <div {...getCollapseProps()}>
                <table className={styles["buttons-map"]}>
                  <tbody>
                    {Array.from({ length: rackData.rowCount }, (_, rowIndex) => (
                      <tr key={rowIndex} className="row">
                        {Array.from({ length: rackData.columnCount }, (_, colIndex) => {
                          const rack = rackData.racks.find(
                            (rack) => rack.row === rowIndex + 1 && rack.column === colIndex + 1
                          );
                          return (
                            <td key={colIndex} className="rack">
                              {rack ? (
                                <Button
                                  type="default"
                                  data-rack-id={rack.id}
                                  onClick={(e) => {
                                    const rackId = e.currentTarget.getAttribute('data-rack-id');
                                    router.push(`/technical/maps/rack-detail?id=${rackId}`);
                                  }}
                                >
                                  {`${rackData.name}${rack.row}-${rack.column}`}
                                </Button>
                              ) : (
                                <span>No Rack</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default LocationPage;
