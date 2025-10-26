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
} from "react-native";
import { useRouter } from "expo-router";

export default function EditProduct() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showMainModal, setShowMainModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  const categories: Record<string, string[]> = {
    Handicrafts: [
      "3D Printing",
      "Arts",
      "Bathroom",
      "Crochet",
      "Decor",
      "Organizers",
      "Pottery",
      "Woodwork",
    ],
    Produce: ["Artisanal", "Fruits", "Grains", "Vegetables"],
  };

  const subOptions = categories[mainCategory] ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/93/93634.png",
            }}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Product Info</Text>
      </View>
      <View style={styles.line} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={[styles.imageBox, styles.shadow]}
        >
          <View style={styles.imageInner}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/748/748113.png" }}
              style={styles.placeholderIcon}
            />
            <Text style={styles.addImageText}>Tap to edit product image</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.inputRow, styles.shadow]}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
            style={styles.textInputWide}
            placeholderTextColor="#888888"
          />
        </View>

        <View style={[styles.inputRow, styles.shadow]}>
          <Text style={styles.label}>Product Category</Text>
          <TouchableOpacity
            style={styles.textInputWide}
            onPress={() => setShowMainModal(true)}
          >
            <Text style={{ color: mainCategory ? "#000000" : "#888888" }}>
              {mainCategory || "Select main category"}
            </Text>
          </TouchableOpacity>
        </View>

        {mainCategory ? (
          <View style={[styles.inputRow, styles.shadow]}>
            <Text style={styles.label}>Subcategory</Text>
            <TouchableOpacity
              style={styles.textInputWide}
              onPress={() => setShowSubModal(true)}
            >
              <Text style={{ color: subcategory ? "#000000" : "#888888" }}>
                {subcategory || "Select subcategory"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={[styles.amountContainer, styles.shadow]}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountRow}>
            <TouchableOpacity
              onPress={() => setAmount((prev) => Math.max(prev - 1, 0))}
              style={[styles.amountBtn, { backgroundColor: "#91CAFF" }]}
            >
              <Text style={styles.amountText}>–</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.textInputAmount}
              value={String(amount)}
              onChangeText={(t) => {
                const n = Number(t);
                setAmount(isNaN(n) ? 0 : Math.max(0, Math.floor(n)));
              }}
              keyboardType="numeric"
            />

            <TouchableOpacity
              onPress={() => setAmount((prev) => prev + 1)}
              style={[styles.amountBtn, { backgroundColor: "#FFEB91" }]}
            >
              <Text style={styles.amountText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.inputRowColumn, styles.shadow]}>
          <Text style={styles.label}>Product Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter product description"
            style={[styles.textInputWideBottom, styles.textArea]}
            placeholderTextColor="#888888"
            multiline
          />
        </View>

        <View style={[styles.priceContainer, styles.shadow]}>
          <Text style={styles.label}>Price ₱</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
            style={styles.textInputPrice}
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.cancelBtn, styles.shadow]}
            onPress={() => router.push("/")}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.confirmBtn, styles.shadow]}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showMainModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {Object.keys(categories).map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setMainCategory(cat);
                  setSubcategory("");
                  setShowMainModal(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={showSubModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {subOptions.map((sub) => (
              <TouchableOpacity
                key={sub}
                onPress={() => {
                  setSubcategory(sub);
                  setShowSubModal(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalText}>{sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EEF3F8" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: { width: 36, height: 36, justifyContent: "center", alignItems: "center" },
  backIcon: { width: 24, height: 24, tintColor: "#111111" },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 12, color: "#111111" },
  line: { height: 1, backgroundColor: "#CCCCCC", marginHorizontal: 20 },

  scrollContainer: { padding: 20, paddingBottom: 40 },

  imageBox: {
    backgroundColor: "#FAF7F0",
    borderRadius: 22,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageInner: { justifyContent: "center", alignItems: "center" },
  placeholderIcon: { width: 48, height: 48, tintColor: "#FFD95A" },
  addImageText: { marginTop: 8, color: "#555555" },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAF7F0",
    borderRadius: 28,
    padding: 12,
    marginBottom: 20,
  },

  inputRowColumn: {
    backgroundColor: "#FAF7F0",
    borderRadius: 28,
    padding: 12,
    marginBottom: 20,
  },

  label: { fontWeight: "bold", color: "#111111", fontSize: 14 },

  textInputWide: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    width: "55%",
  },
  textInputWideBottom: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    width: "100%",
    marginTop: 8,
  },

  textInputPrice: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    width: 120,
    marginLeft: 12,
  },

  textInputAmount: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 14,
    width: 54,
    textAlign: "center",
  },

  textArea: { minHeight: 80, textAlignVertical: "top" },

  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7F0",
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    width: 250,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7F0",
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    width: 250,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    marginLeft: 12,
  },
  amountBtn: {
    borderRadius: 6,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: { fontSize: 20, fontWeight: "bold", color: "#111111" },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    paddingRight: 20,
    gap: 10,
  },
  confirmBtn: {
    backgroundColor: "#FFEB91",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  confirmText: { fontWeight: "bold", color: "#111111" },
  cancelBtn: {
    backgroundColor: "#BF130A",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  cancelText: { fontWeight: "bold", color: "#FFFFFF" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#FAF7F0",
    borderRadius: 25,
    padding: 12,
    width: "80%",
  },
  modalOption: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  modalText: { fontSize: 14, color: "#111111" },

  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});