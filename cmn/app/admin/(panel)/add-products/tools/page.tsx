"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaPlus, FaTrash, FaImage, FaUpload, FaTimes } from "react-icons/fa";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type ExtraField = { id: string; name: string; value: string };

// Remove the static categoryOptions array since we'll use dynamic categories

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cmn-products");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dwjhzcztk/image/upload",
    formData
  );
  return res.data.secure_url;
};

export default function AddToolForm() {
  const [serialId, setSerialId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");
  const [material, setMaterial] = useState<string>("");

  const [extraFields, setExtraFields] = useState<ExtraField[]>([]);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const [subImages, setSubImages] = useState<File[]>([]);
  const [subPreviews, setSubPreviews] = useState<string[]>([]);

  // Brand management states
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [newBrandName, setNewBrandName] = useState<string>("");
  const [showBrandModal, setShowBrandModal] = useState<boolean>(false);
  const [brandToDelete, setBrandToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showBrandDeleteModal, setShowBrandDeleteModal] = useState(false);
  const [deletingBrand, setDeletingBrand] = useState(false);

  // Category management states (new)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(false);

  // Add this state to track saving status
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const subInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch brands and categories from Firestore
  const fetchBrands = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "brands_tools"));
      const brandList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setBrands(brandList);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands");
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories_tools"));
      const categoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  // Add new brand
  const handleAddBrand = async () => {
    if (!newBrandName.trim()) {
      toast.error("Brand name cannot be empty");
      return;
    }

    // Check if brand already exists
    if (
      brands.some((b) => b.name.toLowerCase() === newBrandName.toLowerCase())
    ) {
      toast.error("Brand already exists");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "brands_tools"), {
        name: newBrandName.trim(),
        createdAt: new Date(),
      });

      setBrands((prev) => [
        ...prev,
        { id: docRef.id, name: newBrandName.trim() },
      ]);
      setNewBrandName("");
      toast.success("Brand added successfully!");
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Failed to add brand");
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    // Check if category already exists
    if (
      categories.some((c) => c.name.toLowerCase() === newCategoryName.toLowerCase())
    ) {
      toast.error("Category already exists");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "categories_tools"), {
        name: newCategoryName.trim(),
        createdAt: new Date(),
      });

      setCategories((prev) => [
        ...prev,
        { id: docRef.id, name: newCategoryName.trim() },
      ]);
      setNewCategoryName("");
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  // Open brand delete modal
  const openBrandDeleteModal = (brandId: string, brandName: string) => {
    setBrandToDelete({ id: brandId, name: brandName });
    setShowBrandDeleteModal(true);
  };

  // Open category delete modal
  const openCategoryDeleteModal = (categoryId: string, categoryName: string) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setShowCategoryDeleteModal(true);
  };

  // Confirm brand delete
  const confirmBrandDelete = async () => {
    if (!brandToDelete) return;

    try {
      setDeletingBrand(true);
      await deleteDoc(doc(db, "brands_tools", brandToDelete.id));

      setBrands((prev) => prev.filter((b) => b.id !== brandToDelete.id));
      toast.success("Brand deleted successfully!");
      setShowBrandDeleteModal(false);
      setBrandToDelete(null);
    } catch (error) {
      toast.error("Failed to delete brand");
    } finally {
      setDeletingBrand(false);
    }
  };

  // Confirm category delete
  const confirmCategoryDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setDeletingCategory(true);
      await deleteDoc(doc(db, "categories_tools", categoryToDelete.id));

      setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
      
      // If the deleted category was selected in the form, clear it
      if (category === categoryToDelete.name) {
        setCategory("");
      }
      
      toast.success("Category deleted successfully!");
      setShowCategoryDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeletingCategory(false);
    }
  };

  // Convert File to preview URL
  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  // Handle main image
  const handleMainSelect = async (file: File) => {
    setMainImage(file);
    try {
      const url = await fileToDataUrl(file);
      setMainPreview(url);
    } catch {
      setMainPreview(null);
    }
  };

  // Handle sub images
  const handleSubSelect = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    const remaining = Math.max(0, 3 - subImages.length);
    const toAdd = arr.slice(0, remaining);

    // Show toast if user tries to add more than allowed
    if (arr.length > remaining && subImages.length >= 3) {
      toast.error("You can only add up to 3 additional images");
      return;
    }

    const previews = await Promise.all(toAdd.map((f) => fileToDataUrl(f)));
    setSubImages((prev) => [...prev, ...toAdd]);
    setSubPreviews((prev) => [...prev, ...previews]);
  };

  const addExtraField = () =>
    setExtraFields((prev) => [
      ...prev,
      { id: String(Date.now()), name: "", value: "" },
    ]);
  const updateExtraField = (id: string, patch: Partial<ExtraField>) =>
    setExtraFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f))
    );
  const removeExtraField = (id: string) =>
    setExtraFields((prev) => prev.filter((f) => f.id !== id));
  const removeSubImageAt = (index: number) => {
    setSubImages((prev) => prev.filter((_, i) => i !== index));
    setSubPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit handler
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSaving) return;
    
    setIsSaving(true);

    try {
      toast.loading("Uploading images...", { id: "upload" });

      let mainImageUrl = "";
      if (mainImage) {
        mainImageUrl = await uploadToCloudinary(mainImage);
      }

      const subImageUrls: string[] = [];
      for (const img of subImages) {
        const url = await uploadToCloudinary(img);
        subImageUrls.push(url);
      }

      await addDoc(collection(db, "tools"), {
        serialId,
        category,
        productName,
        brand,
        description,
        warranty,
        material,
        extraFields,
        mainImage: mainImageUrl,
        subImages: subImageUrls,
        createdAt: new Date(),
      });

      toast.dismiss("upload");
      toast.success("Products added successfully!");

      // Reset form
      setSerialId("");
      setCategory("");
      setProductName("");
      setBrand("");
      setDescription("");
      setWarranty("");
      setMaterial("");
      setExtraFields([]);
      setMainImage(null);
      setMainPreview(null);
      setSubImages([]);
      setSubPreviews([]);
    } catch (err) {
      console.error("Error adding product:", err);
      toast.dismiss("upload");
      toast.error("Failed to add product. Check console.");
    } finally {
      // Always set isSaving to false when done (success or error)
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-gray-800 text-sm">
      <Toaster position="top-right" />

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
          <div className="w-1.5 h-6 bg-[#F272A8] rounded-full sm:remo"></div>

          <h1 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
            Add Tools & Equipment
          </h1>
        </div>

        <p className="text-gray-600 text-xs text-center sm:text-left sm:ml-4">
          Create a new tool or equipment
        </p>
      </div>

      {/* Category Management Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Category Management
          </h2>
          <button
            type="button"
            onClick={() => setShowCategoryModal(!showCategoryModal)}
            disabled={isSaving}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              isSaving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {showCategoryModal ? "Hide" : "Manage Categories"}
          </button>
        </div>

        {showCategoryModal && (
          <div className="space-y-3">
            {/* Add New Category */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter new category name"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs font-medium"
              >
                Add Category
              </button>
            </div>

            {/* Category List */}
            <div className="bg-white rounded-lg p-3 max-h-48 overflow-y-auto">
              <p className="text-xs text-gray-500 mb-2">
                Current Categories ({categories.length})
              </p>
              <div className="space-y-1">
                {categories.length === 0 ? (
                  <p className="text-xs text-gray-400">No categories added yet</p>
                ) : (
                  categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-xs font-medium">{cat.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          openCategoryDeleteModal(cat.id, cat.name)
                        }
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brand Management Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Brand Management
          </h2>
          <button
            type="button"
            onClick={() => setShowBrandModal(!showBrandModal)}
            disabled={isSaving}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              isSaving
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {showBrandModal ? "Hide" : "Manage Brands"}
          </button>
        </div>

        {showBrandModal && (
          <div className="space-y-3">
            {/* Add New Brand */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Enter new brand name"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => e.key === "Enter" && handleAddBrand()}
              />
              <button
                type="button"
                onClick={handleAddBrand}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs font-medium"
              >
                Add Brand
              </button>
            </div>

            {/* Brand List */}
            <div className="bg-white rounded-lg p-3 max-h-48 overflow-y-auto">
              <p className="text-xs text-gray-500 mb-2">
                Current Brands ({brands.length})
              </p>
              <div className="space-y-1">
                {brands.length === 0 ? (
                  <p className="text-xs text-gray-400">No brands added yet</p>
                ) : (
                  brands.map((brand) => (
                    <div
                      key={brand.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-xs font-medium">{brand.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          openBrandDeleteModal(brand.id, brand.name)
                        }
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-lg text-sm"
      >
        {/* Serial ID + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">
              Product ID <span className="text-[#F272A8]">*</span>
            </label>
            <input
              required
              value={serialId}
              onChange={(e) => setSerialId(e.target.value)}
              placeholder="Enter Product ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">
              Product Category <span className="text-[#F272A8]">*</span>
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30 appearance-none"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Name + Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">
              Product Name <span className="text-[#F272A8]">*</span>
            </label>
            <input
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">
              Brand <span className="text-[#F272A8]">*</span>
            </label>
            <select
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30 appearance-none"
            >
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-xs">
            Description <span className="text-[#F272A8]">*</span>
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter detailed product description..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30 min-h-[100px] resize-y"
          />
        </div>

        {/* Warranty + Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">
              Warranty
            </label>
            <input
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g., 2 years"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">
              Material
            </label>
            <input
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="e.g., Stainless Steel"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
            />
          </div>
        </div>

        {/* Extra Fields */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800">
              Additional Specifications
            </h2>
            <button
              type="button"
              onClick={addExtraField}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F272A8] text-white rounded-lg hover:bg-[#e06597] transition-colors duration-200"
            >
              <FaPlus size={12} /> Add Field
            </button>
          </div>

          <div className="space-y-2">
            {extraFields.map((f) => (
              <div
                key={f.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center bg-white p-2 rounded-lg border border-gray-200"
              >
                <input
                  value={f.name}
                  onChange={(e) =>
                    updateExtraField(f.id, { name: e.target.value })
                  }
                  placeholder="Field name"
                  className="col-span-2 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
                />
                <input
                  value={f.value}
                  onChange={(e) =>
                    updateExtraField(f.id, { value: e.target.value })
                  }
                  placeholder="Field value"
                  className="col-span-2 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
                />
                <button
                  type="button"
                  onClick={() => removeExtraField(f.id)}
                  className="p-2 text-gray-500 hover:text-[#F272A8] flex justify-center"
                  aria-label="Remove field"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
          <label className="block mb-2 font-medium text-gray-700">
            Main Image <span className="text-[#F272A8]">*</span>
          </label>
          <div
            onClick={() => mainInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer bg-white hover:border-[#F272A8]/40 hover:bg-gray-50/50 transition-all duration-200 group"
          >
            {mainPreview ? (
              <img
                src={mainPreview}
                alt="main preview"
                className="mx-auto max-h-48 object-contain rounded-lg"
              />
            ) : (
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-[#F272A8]/10">
                  <FaImage className="text-2xl text-[#F272A8]" />
                </div>
                <p className="text-gray-500 text-xs">
                  Click to browse or drag and drop
                </p>
              </div>
            )}
            <input
              required
              ref={mainInputRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleMainSelect(e.target.files[0])
              }
              className="hidden"
            />
          </div>
        </div>

        {/* Sub Images */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
          <label className="block mb-2 font-medium text-gray-700">
            Additional Images (up to 3)
          </label>
          <div
            onClick={() => {
              if (subImages.length >= 3) {
                toast.error("You can only add up to 3 additional images");
                return;
              }
              subInputRef.current?.click();
            }}
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer bg-white hover:border-[#F272A8]/40 hover:bg-gray-50/50 transition-all duration-200 group"
          >
            {subPreviews.length === 0 ? (
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-[#F272A8]/10">
                  <FaUpload className="text-2xl text-[#F272A8]" />
                </div>
                <p className="text-gray-500 text-xs">
                  Click to browse or drag and drop multiple images
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                {subPreviews.map((src, idx) => (
                  <div key={idx} className="relative group/image">
                    <img
                      src={src}
                      alt={`sub-${idx}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubImageAt(idx)}
                      className="absolute -top-1 -right-1 bg-[#F272A8] text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              ref={subInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                e.target.files && handleSubSelect(e.target.files)
              }
              className="hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSaving}
            className={`bg-[#F272A8] text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md flex items-center gap-2 text-xs ${
              isSaving 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-[#e06597] hover:shadow-lg"
            }`}
          >
            {isSaving ? "Saving..." : "Save Product"}
          </button>
        </div>

        {/* BRAND DELETE CONFIRM MODAL */}
        {showBrandDeleteModal && brandToDelete && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
              <h2 className="text-xl font-bold text-red-600 mb-2">
                Delete Brand
              </h2>

              <p className="text-gray-600 mb-5 text-sm">
                Are you sure you want to delete
                <span className="font-semibold text-gray-900">
                  {" "}
                  “{brandToDelete.name}”
                </span>
                ?
                <br />
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowBrandDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmBrandDelete}
                  disabled={deletingBrand}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  {deletingBrand ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY DELETE CONFIRM MODAL */}
        {showCategoryDeleteModal && categoryToDelete && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
              <h2 className="text-xl font-bold text-red-600 mb-2">
                Delete Category
              </h2>

              <p className="text-gray-600 mb-5 text-sm">
                Are you sure you want to delete
                <span className="font-semibold text-gray-900">
                  {" "}
                  “{categoryToDelete.name}”
                </span>
                ?
                <br />
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCategoryDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmCategoryDelete}
                  disabled={deletingCategory}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                  {deletingCategory ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}