import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

export default function SalesHistory() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width - 60;
  const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const chartValues = [0, 0, 0, 0, 0, 0];
  const maxValue = Math.max(...chartValues, 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/93/93634.png" }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Sales</Text>
      </View>

      <View style={styles.headerLine} />

      <View style={styles.storeHeader}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.storeIcon}
        />
        <Text style={styles.storeName}>
          Store Name{" "}
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2107/2107957.png" }}
            style={styles.starIcon}
          />
        </Text>
      </View>

      <Text style={styles.sectionTitle}>My Sales</Text>
      <View style={styles.salesBox}>
        <View style={styles.salesGroup}>
          <View style={styles.salesRow}>
            {["Unpaid", "To Ship", "Shipping", "Completed"].map((label) => (
              <View style={styles.salesItem} key={label}>
                <View style={styles.salesNumberBox}>
                  <Text style={styles.salesNumber}>0</Text>
                </View>
                <Text style={styles.salesLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.salesRow, styles.bottomRow]}>
            <View style={[styles.salesItem, { marginTop: -15 }]}>
              <View style={styles.salesNumberBox}>
                <Text style={styles.salesNumber}>0</Text>
              </View>
              <Text style={styles.salesLabel}>Canceled</Text>
            </View>
            <View style={[styles.salesItem, { transform: [{ translateX: -11 }] }]}>
              <View style={styles.salesNumberBox}>
                <Text style={styles.salesNumber}>0</Text>
              </View>
              <Text style={styles.salesLabel}>Return/Refund</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Product Details</Text>
      <View style={styles.productBox}>
        <View style={styles.productLeft}>
          <View style={styles.productRow}>
            <Text style={styles.productLabel}>Low Stock Items</Text>
            <View style={styles.productRightSide}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/159/159469.png",
                }}
                style={styles.warningIcon}
              />
              <Text style={styles.productZero}>0</Text>
            </View>
          </View>

          <View style={styles.productRow}>
            <Text style={styles.productLabel}>All Items</Text>
            <Text style={styles.productZeroAligned}>0</Text>
          </View>

          <View style={styles.productRow}>
            <Text style={styles.productLabel}>All Item Category</Text>
            <Text style={styles.productZeroAligned}>0</Text>
          </View>
        </View>

        <View style={styles.verticalLine} />

        <View style={styles.productRight}>
          <Text style={styles.topSelling}>Top Selling Product</Text>
          <View style={styles.emptyImageBox} />
          <Text style={styles.productName}>Product Name</Text>
          <Text style={styles.productAmount}>x0 (Amount)</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Key Metrics</Text>
      <View style={styles.metricsBox}>
        <View style={styles.metricsRow}>
          <View style={[styles.metricItem, { backgroundColor: "#91CAFF" }]}>
            <Text style={styles.metricNumber}>0</Text>
          </View>
          <View style={[styles.metricItem, { backgroundColor: "#FFEB91" }]}>
            <Text style={styles.metricNumber}>0</Text>
          </View>
          <View style={[styles.metricItem, { backgroundColor: "#91CAFF" }]}>
            <Text style={styles.metricNumber}>0</Text>
          </View>
          <View style={[styles.metricItem, { backgroundColor: "#FFEB91" }]}>
            <Text style={styles.metricNumber}>0</Text>
          </View>
        </View>

        <View style={styles.metricLabelsRow}>
          <View style={styles.metricLabelBox}>
            <Text style={styles.metricLabelBold}>Total Sales</Text>
          </View>
          <View style={styles.metricLabelBox}>
            <Text style={styles.metricLabelBold}>Total Order</Text>
          </View>
          <View style={styles.metricLabelBox}>
            <Text style={styles.metricLabelBold}>Products Sold</Text>
          </View>
          <View style={styles.metricLabelBox}>
            <Text style={styles.metricLabelBold}>Total Customers</Text>
          </View>
        </View>

        <View style={styles.metricsSeparator} />

        <Text style={styles.revenueLabel}>Total Revenue</Text>

        <View style={[styles.nativeChartContainer, { width: screenWidth }]}>
          <View style={styles.nativeChartBars}>
            {chartValues.map((val, i) => {
              const barHeight = Math.round((val / maxValue) * 120);
              return (
                <View key={i} style={styles.barColumn}>
                  <View style={[styles.barFill, { height: barHeight }]} />
                  <Text style={styles.barLabel}>{chartLabels[i]}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.rangeButtonsContainer}>
          {["Day", "Week", "Month", "Year"].map((range) => (
            <TouchableOpacity key={range} style={styles.rangeButton}>
              <Text style={styles.rangeButtonText}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3F8FF", padding: 15, marginTop: 25 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  backButton: { marginRight: 8 },
  backIcon: { width: 22, height: 22, tintColor: "#111111FF" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#111111FF" },
  headerLine: { height: 1, backgroundColor: "#CCCCCCFF", marginBottom: 10 },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7F0FF",
    borderRadius: 58,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  storeIcon: { width: 55, height: 55, borderRadius: 40 },
  storeName: { fontWeight: "bold", fontSize: 16, color: "#111111FF", marginLeft: 10 },
  starIcon: { width: 16, height: 16 },
  sectionTitle: { fontWeight: "bold", color: "#111111FF", fontSize: 14, marginBottom: 6 },
  salesBox: {
    backgroundColor: "#FAF7F0",
    borderRadius: 15,
    paddingVertical: 20,
    borderWidth: 8,
    borderColor: "#91CAFFFF",
    marginBottom: 15,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  salesGroup: { marginLeft: -20 },
  salesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 8,
  },
  bottomRow: {
    width: "45%",
    marginLeft: 32,
    justifyContent: "space-between",
  },
  salesItem: { alignItems: "center", width: 70 },
  salesNumberBox: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: "#000000FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    backgroundColor: "#FFFFFFFF",
  },
  salesNumber: { fontSize: 20, fontWeight: "bold", color: "#111111FF" },
  salesLabel: { fontSize: 12, color: "#333333FF", textAlign: "center" },
  productBox: {
    backgroundColor: "#FAF7F0",
    borderRadius: 15,
    padding: 10,
    borderWidth: 8,
    borderColor: "#FFEB91",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  productLeft: { flex: 1, paddingRight: 8 },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  productLabel: { color: "#111111FF", fontSize: 13, fontWeight: "bold" },
  productZero: { color: "#111111FF", fontSize: 13, marginLeft: 3 },
  productRightSide: { flexDirection: "row", alignItems: "center" },
  productZeroAligned: { color: "#111111FF", fontSize: 13, textAlign: "right" },
  warningIcon: { width: 22, height: 22, tintColor: "#BF130AFF" },
  verticalLine: {
    width: 1.5,
    height: "90%",
    backgroundColor: "#CCCCCCFF",
    marginHorizontal: 10,
  },
  productRight: { alignItems: "center", width: 120 },
  topSelling: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#1A73E8FF",
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  emptyImageBox: {
    width: 80,
    height: 80,
    borderColor: "#FFEB91",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: { fontSize: 12, fontWeight: "bold", color: "#111111FF" },
  productAmount: { fontSize: 11, color: "#333333FF" },
  metricsBox: {
    backgroundColor: "#FAF7F0",
    borderRadius: 15,
    padding: 10,
    borderWidth: 10,
    borderColor: "#FAF7F0FF",
    marginBottom: 20,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  metricsRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 4 },
  metricItem: {
    width: 55,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  metricNumber: { fontSize: 18, fontWeight: "bold", color: "#111111FF" },
  metricLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  metricLabelBox: { alignItems: "center", width: 70 },
  metricLabelBold: {
    fontSize: 11,
    color: "#111111FF",
    fontWeight: "bold",
    textAlign: "center",
  },
  metricsSeparator: {
    height: 1,
    backgroundColor: "#CCCCCCFF",
    marginVertical: 8,
  },
  revenueLabel: {
    fontWeight: "bold",
    color: "#111111FF",
    fontSize: 13,
    marginLeft: 5,
    marginBottom: 8,
  },
  nativeChartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  nativeChartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 140,
    paddingHorizontal: 6,
  },
  barColumn: { alignItems: "center", width: (Dimensions.get("window").width - 120) / 6 },
  barFill: {
    width: "100%",
    backgroundColor: "#91CAFF",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: { marginTop: 6, fontSize: 11, color: "#333333FF", textAlign: "center" },
  rangeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  rangeButton: {
    backgroundColor: "#FFFFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rangeButtonText: {
    color: "#111111FF",
    fontSize: 12,
    fontWeight: "bold",
  },
});