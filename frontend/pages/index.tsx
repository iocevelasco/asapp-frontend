import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classes from '../styles/Home.module.css';
import { Typography, Card, Space } from 'antd';
import { ICity } from '../src/types/interface';
import Image from 'next/image';

const { Text, Title } = Typography;
//containers
import SearchBar from '../src/containers/SearchBar';
import { usePreferences } from '../src/hooks/usePreference';

const Home: NextPage = () => {
  const [citiSelected, setCitiSelected] = useState<ICity>({
    geonameid: null,
    name: '',
    country: '',
    subcountry: '',
  });
  const { preferences } = usePreferences(citiSelected);
  return (
    <div className={classes.container}>
      <Head>
        <title>Asapp Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.header}>
        <Image
          src="https://cdn-icons-png.flaticon.com/512/1083/1083547.png"
          alt="Picture of the author"
          width={80}
          height={80}
        />
        <Title level={4}>Hi Human! We'll to invide your world</Title>
        <Title level={5}>Be kind and suggesting a city!</Title>
      </div>
      <Card>
        {citiSelected.geonameid && (
          <div className={classes.header}>
            <Text type="secondary">Select your favorite city</Text>
            <div>
              <Space>
                <Text>
                  City:<Text strong>{citiSelected.name}</Text>
                </Text>
                -
                <Text>
                  Country: <Text strong>{citiSelected.country}</Text>
                </Text>
              </Space>
            </div>
          </div>
        )}
        <SearchBar
          setCitiSelected={setCitiSelected}
          preferences={preferences}
        />
      </Card>
      <span className={classes.bg} />
    </div>
  );
};

export default Home;
