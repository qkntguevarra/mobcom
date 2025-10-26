import React, { useState } from "react"; 
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [shopName, setShopName] = useState("Store Name");
  const [description, setDescription] = useState("");
  const [policy, setPolicy] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editShopName, setEditShopName] = useState(shopName);
  const [editDescription, setEditDescription] = useState(description);
  const [editPolicy, setEditPolicy] = useState(policy);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/93/93634.png" }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shop</Text>
      </View>

      <View style={styles.headerLine} />

      <View style={styles.shopHeader}>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
            style={styles.shopImage}
          />
        </TouchableOpacity>

        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>
            {shopName}{" "}
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2107/2107957.png" }}
              style={styles.starIcon}
            />
          </Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.boxContainer}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.textValue}>{description || "No description added."}</Text>
          <View style={styles.separatorLine} />
          <Text style={[styles.sectionLabel, { marginTop: 10 }]}>Shop Policy</Text>
          <Text style={styles.textValue}>{policy || "No policy added."}</Text>
        </View>

        <View style={styles.sideButtons}>
          <Pressable
            style={({ pressed }) => [styles.button, styles.editBtn, pressed && styles.pressed]}
            onPress={() => {
              setEditShopName(shopName);
              setEditDescription(description);
              setEditPolicy(policy);
              setIsEditing(true);
            }}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.button, styles.viewBtn, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>View Shop</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.salesContainer}>
        <View style={styles.salesHeader}>
          <Text style={styles.salesTitle}>Sales History</Text>
          <Pressable
            onPress={() => router.push("/SalesHistory")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.salesViewAll}>View all &gt;</Text>
          </Pressable>
        </View>
        <View style={styles.salesStats}>
          {["Unpaid", "Completed", "Canceled", "Return/Refund"].map((label) => (
            <View style={styles.salesBox} key={label}>
              <Text style={styles.salesNumber}>0</Text>
              <Text style={styles.salesLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.productsContainer}>
        <View style={styles.productsHeader}>
          <View style={styles.productsTitleRow}>
            <Text style={styles.productsTitle}>My Products</Text>
            <TouchableOpacity
              style={styles.addButtonWrapper}
              onPress={() => router.push("/AddProduct")}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/9239/9239975.png",
                }}
                style={styles.plusIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productCard}>
          <View style={styles.productImageContainer}>
            <View style={styles.productImageBox} />
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>Product Name</Text>
            <Text style={styles.productCategory}>Category</Text>
            <Text style={styles.productDescription}>Description</Text>
            <Text style={styles.productAmount}>x0 (Amount)</Text>
          </View>

          <View style={styles.productRightSection}>
            <View style={styles.productActions}>
              <TouchableOpacity onPress={() => router.push("/EditProduct")}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/16861/16861405.png",
                  }}
                  style={styles.editIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/3096/3096673.png" }}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>Price: ₱</Text>
          </View>
        </View>
      </View>

      <Modal visible={isEditing} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Shop Info</Text>

            <TextInput
              style={styles.input}
              value={editShopName}
              onChangeText={setEditShopName}
              placeholder="Shop Name"
              placeholderTextColor="#777777FF"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Description"
              placeholderTextColor="#777777FF"
              multiline
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              value={editPolicy}
              onChangeText={setEditPolicy}
              placeholder="Shop Policy"
              placeholderTextColor="#777777FF"
              multiline
            />

            <View style={styles.modalButtonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.cancelButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.saveButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => {
                  setShopName(editShopName);
                  setDescription(editDescription);
                  setPolicy(editPolicy);
                  setIsEditing(false);
                }}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3F8FF", padding: 15, marginTop: 25 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.97 }] },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  backButton: { marginRight: 8 },
  backIcon: { width: 22, height: 22, tintColor: "#111111FF" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#111111FF" },
  headerLine: { height: 1, backgroundColor: "#CCCCCCFF", marginBottom: 10 },
  shopHeader: {
    backgroundColor: "#FAF7F0FF",
    borderRadius: 58,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  shopImage: { width: 60, height: 60, borderRadius: 40 },
  shopInfo: { marginLeft: 10 },
  shopName: { fontWeight: "bold", fontSize: 16, color: "#111111FF" },
  starIcon: { width: 16, height: 16 },
  infoSection: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  boxContainer: {
    backgroundColor: "#FFFFFFFF",
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderWidth: 8,
    borderColor: "#FAF7F0FF",
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  sideButtons: { alignItems: "center", gap: 10 },
  sectionLabel: { fontWeight: "bold", color: "#111111FF" },
  textValue: { color: "#222222FF", marginTop: 4 },
  separatorLine: { height: 1, backgroundColor: "#DDDDDDFF", marginVertical: 10 },
  button: {
    borderRadius: 58,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: { backgroundColor: "#FFEB91FF", width: 123 },
  viewBtn: { backgroundColor: "#A7D1FFFF" },
  buttonText: { fontWeight: "bold", color: "#111111FF" },
  salesContainer: {
    backgroundColor: "#FFFFFFFF",
    borderRadius: 15,
    padding: 10,
    borderWidth: 10,
    borderColor: "#91CAFFFF",
    marginBottom: 15,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  salesHeader: { flexDirection: "row", justifyContent: "space-between" },
  salesTitle: { fontWeight: "bold", color: "#111111FF" },
  salesViewAll: { color: "#555555FF" },
  salesStats: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  salesBox: { alignItems: "center", justifyContent: "center", width: "23%" },
  salesNumber: { fontSize: 18, fontWeight: "bold", color: "#111111FF" },
  salesLabel: { fontSize: 12, color: "#333333FF", textAlign: "center", alignSelf: "center", includeFontPadding: false },
  productsContainer: {
    backgroundColor: "#FAF7F0FF",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000000FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  productsHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  productsTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  productsTitle: { fontWeight: "bold", fontSize: 15, color: "#111111FF" },
  addButtonWrapper: { padding: 6, borderRadius: 20 },
  plusIcon: { width: 22, height: 22, tintColor: "#91CAFFFF" },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFFFF",
    borderRadius: 15,
    marginTop: 10,
    padding: 10,
    alignItems: "flex-start",
  },
  productImageContainer: { marginRight: 10 },
  productImageBox: {
    width: 60,
    height: 60,
    backgroundColor: "#FFEB91FF",
    borderRadius: 10,
  },
  productInfo: { flex: 1 },
  productName: { fontWeight: "bold", color: "#111111FF" },
  productCategory: { color: "#333333FF" },
  productDescription: { color: "#333333FF" },
  productAmount: { color: "#333333FF", marginTop: 3 },
  productRightSection: { alignItems: "flex-end" },
  productActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  productPrice: { color: "#111111FF", fontWeight: "500", marginTop: 43, alignSelf: "flex-end" },
  editIcon: { width: 18, height: 18, tintColor: "#111111FF" },
  deleteIcon: { width: 18, height: 18, tintColor: "#FF5C5CFF" },
  modalOverlay: { flex: 1, backgroundColor: "#00000080", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", backgroundColor: "#FFFFFFFF", borderRadius: 15, padding: 20 },
  modalTitle: { fontWeight: "bold", marginBottom: 10, fontSize: 16, color: "#111111FF" },
  input: { borderWidth: 1, borderColor: "#CCCCCCFF", borderRadius: 8, padding: 8, marginBottom: 10, color: "#222222FF" },
  textArea: { minHeight: 80, textAlignVertical: "top", color: "#222222FF" },
  modalButtonRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10, gap: 10 },
  modalButton: { borderRadius: 58, paddingVertical: 8, paddingHorizontal: 20 },
  cancelButton: { backgroundColor: "#CCCCCCFF" },
  saveButton: { backgroundColor: "#FFD95AFF" },
  modalButtonText: { fontWeight: "bold", color: "#000000FF" },
});