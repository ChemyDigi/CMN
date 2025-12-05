"use client";

import React, { useRef, useState } from "react";
import { FaPlus, FaTrash, FaImage, FaUpload } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type ExtraField = { id: string; name: string; value: string };

const categoryOptions = ["Hand Tools", "Power Tools", "Garden", "Safety", "Electrical"];
const brandOptions = ["Brand A", "Brand B", "Brand C"];

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cmn-products"); // Replace with your preset

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dwjhzcztk/image/upload", // Replace with your cloud name
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

  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const subInputRef = useRef<HTMLInputElement | null>(null);

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
    const remaining = Math.max(0, 5 - subImages.length);
    const toAdd = arr.slice(0, remaining);
    const previews = await Promise.all(toAdd.map((f) => fileToDataUrl(f)));
    setSubImages((prev) => [...prev, ...toAdd]);
    setSubPreviews((prev) => [...prev, ...previews]);
  };

  const addExtraField = () =>
    setExtraFields((prev) => [...prev, { id: String(Date.now()), name: "", value: "" }]);
  const updateExtraField = (id: string, patch: Partial<ExtraField>) =>
    setExtraFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const removeExtraField = (id: string) =>
    setExtraFields((prev) => prev.filter((f) => f.id !== id));
  const removeSubImageAt = (index: number) => {
    setSubImages((prev) => prev.filter((_, i) => i !== index));
    setSubPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit handler
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

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
      toast.success("Tool added successfully!");

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
      console.error("Error adding tool:", err);
      toast.dismiss("upload");
      toast.error("Failed to add tool. Check console.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 text-gray-800 text-sm">
      <Toaster position="top-right" />
      <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-6 bg-[#F272A8] rounded-full"></div>
                    <h1 className="text-2xl font-bold text-gray-900">Add Tools &  Equipment</h1>
                </div>
                <p className="text-gray-600 ml-4 text-xs">Create a new tool or equipment product</p>
            </div>
      <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg text-sm">
        
        {/* Serial ID + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">Serial ID</label>
            <input
              value={serialId}
              onChange={(e) => setSerialId(e.target.value)}
              placeholder="Enter serial ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30 appearance-none"
            >
              <option value="">Select category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
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
              {brandOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
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
            <label className="block mb-1 font-medium text-gray-700 text-xs">Warranty</label>
            <input
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g., 2 years"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-xs">Material</label>
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
            <h2 className="font-semibold text-gray-800">Additional Specifications</h2>
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
                  onChange={(e) => updateExtraField(f.id, { name: e.target.value })}
                  placeholder="Field name"
                  className="col-span-2 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#F272A8]/30"
                />
                <input
                  value={f.value}
                  onChange={(e) => updateExtraField(f.id, { value: e.target.value })}
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
          <label className="block mb-2 font-medium text-gray-700">Main Image</label>
          <div
            onClick={() => mainInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer bg-white hover:border-[#F272A8]/40 hover:bg-gray-50/50 transition-all duration-200 group"
          >
            {mainPreview ? (
              <img src={mainPreview} alt="main preview" className="mx-auto max-h-48 object-contain rounded-lg" />
            ) : (
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-[#F272A8]/10">
                  <FaImage className="text-2xl text-[#F272A8]" />
                </div>
                <p className="text-gray-500 text-xs">Click to browse or drag and drop</p>
              </div>
            )}
            <input
              ref={mainInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleMainSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
        </div>

        {/* Sub Images */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
          <label className="block mb-2 font-medium text-gray-700">Additional Images (up to 5)</label>
          <div
            onClick={() => subInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer bg-white hover:border-[#F272A8]/40 hover:bg-gray-50/50 transition-all duration-200 group"
          >
            {subPreviews.length === 0 ? (
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-[#F272A8]/10">
                  <FaUpload className="text-2xl text-[#F272A8]" />
                </div>
                <p className="text-gray-500 text-xs">Click to browse or drag and drop multiple images</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {subPreviews.map((src, idx) => (
                  <div key={idx} className="relative group/image">
                    <img src={src} alt={`sub-${idx}`} className="h-24 w-full object-cover rounded-lg" />
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
              onChange={(e) => e.target.files && handleSubSelect(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="bg-[#F272A8] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#e06597] transition-all duration-200 shadow-md flex items-center gap-2 text-xs"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
