"use client";

import styles from "@/styles/header.module.css";
import HeaderComponent from "@/components/layout/Header";
import { Layout, theme } from "antd";
import React, { ReactNode } from "react";
import store from "@/store";
import { persistStore } from "redux-persist";
import SliderComponent from "@/components/layout/Slider";
import { PersistGate } from "redux-persist/integration/react";

const { Content } = Layout;

interface Props {
  content: ReactNode;
}
let persistor = persistStore(store);

const Home: React.FC<Props> = (props) => {
  const { content } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <Layout>
        <HeaderComponent className={styles["header"]} />
        <Layout>
          <SliderComponent className={styles["slider"]} />
          <Content
            style={{
              margin: "16px",
              background: colorBgContainer,
              overflowX: "auto",
              height: "calc(100vh - 96px)",
            }}
          >
            <div className="h-screen">{content}</div>
          </Content>
        </Layout>
      </Layout>
    </PersistGate>
  );
};

export default Home;
