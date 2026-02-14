import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import Checkbox from "./components/Checkbox";
import { CustomButton } from "./components/CustomButton";
import CustomInput from "./components/CustomInput";
import RadioButton from "./components/RadioButton";
import "./global.css";

interface FormState {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  acceptTerms: boolean;
  gender: "" | "male" | "female" | "other";
  birthDate: Date | null;
}

interface FormErrors {
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  acceptTerms?: string;
  gender?: string;
  birthDate?: string;
}

interface FormTouched {
  fullname?: boolean;
  email?: boolean;
  phone?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  address?: boolean;
  acceptTerms?: boolean;
  gender?: boolean;
  birthDate?: boolean;
}

export default function Index() {
  const [form, setForm] = useState<FormState>({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptTerms: false,
    gender: "",
    birthDate: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const isAgeValid = (birth: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  // ===== Validate Field =====
  const validateField = (
    name: Exclude<keyof FormState, "acceptTerms">,
    value: any,
  ) => {
    let error = "";

    if (!value.trim()) {
      error = "กรุณากรอกข้อมูล";
    } else {
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "รูปแบบอีเมลไม่ถูกต้อง";
        }
      }

      if (name === "phone") {
        if (!/^\d{10}$/.test(value)) {
          error = "เบอร์โทรศัพท์ต้องมี 10 หลัก";
        }
      }

      if (name === "password") {
        if (value.length < 6) {
          error = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        }
      }

      if (name === "confirmPassword") {
        if (value !== form.password) {
          error = "รหัสผ่านไม่ตรงกัน";
        }
      }

      if (name === "address") {
        if (value.trim().length < 10) {
          error = "ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  // ===== Change =====
  const handleChange = (name: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name] && name !== "acceptTerms") {
      validateField(name, value);
    }
  };

  // ===== Blur =====
  const handleBlur = (name: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (name !== "acceptTerms") {
      validateField(name, form[name]);
    }
  };

  // ===== Validate All =====
  const validateForm = () => {
    let valid = true;

    (Object.keys(form) as (keyof FormState)[]).forEach((key) => {
      if (key !== "acceptTerms") {
        if (validateField(key, form[key] as string)) valid = false;
      }
    });

    if (!form.acceptTerms) {
      setErrors((prev) => ({
        ...prev,
        acceptTerms: "กรุณายอมรับข้อกำหนดและเงื่อนไข",
      }));
      valid = false;
    }
    if (!form.gender) {
      setErrors((prev) => ({ ...prev, gender: "กรุณาเลือกเพศ" }));
      valid = false;
    }

    if (!form.birthDate) {
      setErrors((prev) => ({ ...prev, birthDate: "กรุณาเลือกวันเกิด" }));
      valid = false;
    } else if (isAgeValid(form.birthDate) < 13) {
      setErrors((prev) => ({ ...prev, birthDate: "อายุต้องมากกว่า 13 ปี" }));
      valid = false;
    }

    setTouched({
      fullname: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      address: true,
      acceptTerms: true,
    });

    return valid;
  };

  // ===== Submit =====
  const handleSubmit = () => {
    if (!validateForm()) return;
    Alert.alert("สำเร็จ", "ลงทะเบียนเรียบร้อย 🎉");
  };

  // ===== Reset =====
  const handleReset = () => {
    setForm({
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      acceptTerms: false,
      gender: "",
      birthDate: null,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView>
        {/* Header */}
        <View className="bg-blue-600 px-6 py-8">
          <Text className="text-white text-2xl font-bold">ลงทะเบียนสมาชิก</Text>
          <Text className="text-white/80 mt-1">กรุณากรอกข้อมูลให้ครบถ้วน</Text>
        </View>

        <View className="p-5">
          <CustomInput
            label="ชื่อ-นามสกุล"
            placeholder="ระบุชื่อและนามสกุล"
            value={form.fullname}
            onChangeText={(t) => handleChange("fullname", t)}
            onBlur={() => handleBlur("fullname")}
            error={errors.fullname}
            touched={touched.fullname}
          />

          <CustomInput
            label="อีเมล"
            placeholder="example@email.com"
            value={form.email}
            onChangeText={(t) => handleChange("email", t)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="เบอร์โทรศัพท์"
            placeholder="0812345678"
            value={form.phone}
            onChangeText={(t) => handleChange("phone", t)}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
            touched={touched.phone}
            keyboardType="numeric"
          />

          <CustomInput
            label="รหัสผ่าน"
            placeholder="อย่างน้อย 6 ตัวอักษร"
            value={form.password}
            onChangeText={(t) => handleChange("password", t)}
            onBlur={() => handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            secureTextEntry
          />

          <CustomInput
            label="ยืนยันรหัสผ่าน"
            placeholder="ระบุรหัสผ่านอีกครั้ง"
            value={form.confirmPassword}
            onChangeText={(t) => handleChange("confirmPassword", t)}
            onBlur={() => handleBlur("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            secureTextEntry
          />

          <CustomInput
            label="ที่อยู่"
            placeholder="กรอกที่อยู่"
            value={form.address}
            onChangeText={(t) => handleChange("address", t)}
            onBlur={() => handleBlur("address")}
            error={errors.address}
            touched={touched.address}
            multiline
            style={{ height: 120, textAlignVertical: "top" }}
            maxLength={200}
          />

          <Text className="text-right text-gray-500 text-xs -mt-3 mb-3">
            {form.address.length}/200
          </Text>

          <RadioButton
            label="เพศ"
            value={form.gender}
            onChange={(v) => handleChange("gender", v)}
            options={[
              { label: "ชาย", value: "male" },
              { label: "หญิง", value: "female" },
              { label: "ไม่ระบุ", value: "other" },
            ]}
          />
          {touched.gender && errors.gender && (
            <Text className="text-red-500 text-xs mb-2">{errors.gender}</Text>
          )}

          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-300 rounded-lg px-4 py-3 mb-2"
          >
            <Text className={form.birthDate ? "text-black" : "text-gray-400"}>
              {form.birthDate ? formatDate(form.birthDate) : "เลือกวันเกิด"}
            </Text>
          </Pressable>

          {touched.birthDate && errors.birthDate && (
            <Text className="text-red-500 text-xs mb-3">
              {errors.birthDate}
            </Text>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={form.birthDate || new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(_, date) => {
                setShowDatePicker(false);
                if (date) handleChange("birthDate", date);
              }}
            />
          )}

          <Checkbox
            checked={form.acceptTerms}
            onChange={(v) => handleChange("acceptTerms", v)}
          />
          {touched.acceptTerms && errors.acceptTerms && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.acceptTerms}
            </Text>
          )}

          <CustomButton title="ลงทะเบียน" onPress={handleSubmit} />
          <CustomButton
            title="รีเซ็ตฟอร์ม"
            variant="secondary"
            onPress={handleReset}
          />

          {/* คำแนะนำ (ไม่ตก ไม่หาย) */}
          <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <Text className="text-blue-800 font-semibold text-base mb-2">
              คำแนะนำ
            </Text>
            <Text className="text-blue-700 text-sm leading-5">
              - กรุณากรอกข้อมูลให้ครบถ้วน {"\n"}- อีเมลต้องมีรูปแบบที่ถูกต้อง{" "}
              {"\n"}- เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก {"\n"}-
              รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
