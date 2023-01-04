import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Auth } from "../../utils/Auth";

export default function AdminDashboardScreen() {
  return (
    <Auth adminOnly>
      <Layout>
        <h1>Admin Dashboard</h1>
      </Layout>
    </Auth>
  );
}
