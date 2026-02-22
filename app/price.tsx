import Container from "@/components/container";
import { PriceCheckCard } from "@/components/price-check-card";
import { Input } from "@/components/ui/input";
import { useGetItemPriceByBarcodeMutation } from "@/hooks/tanstack-query/mutation/get-item-details-mutation";
import { Feather } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const Price = () => {
  const barcodeInputRef = useRef<any>(null);
  const {
    data: res,
    mutate,
    reset: resetGetItemMutation,
  } = useGetItemPriceByBarcodeMutation();
  const form = useForm({
    defaultValues: { barcode: "" },
  });

  const onSubmit = form.handleSubmit(({ barcode }) => {
    mutate(barcode, {
      onSuccess(res) {
        res.success && barcodeInputRef?.current?.focus();
        Toast.show({
          type: res.success ? "success" : "error",
          text1: res.message,
        });
      },
    });
  });

  return (
    <Container>
      <View className="h-16 justify-center">
        <Controller
          control={form.control}
          name="barcode"
          render={({ field: { onChange, value } }) => (
            <View className="relative">
              <Input
                placeholder="Barcode"
                keyboardType="numeric"
                returnKeyType="go"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                selectTextOnFocus
                ref={barcodeInputRef}
              />

              {/* Clear Button */}
              {value.length > 0 && (
                <View className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <TouchableOpacity
                    onPress={async () => {
                      form.reset({ barcode: "" });
                    }}
                  >
                    <Feather name="x-circle" size={24} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>

      {/* <View className='flex-1 pb-0'> */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {res?.success ? (
          <PriceCheckCard
            barcode={res.data.barcode}
            itemCode={res.data.item_code ?? ""}
            description={res.data.description ?? ""}
            regularPrice={res.data.price}
            promoPrice={res.data.promoPrice ?? undefined}
            supplierCode={res.data.supplierCode ?? ""}
            supplierName={res.data.supplierName ?? ""}
            currency="SAR"
          />
        ) : null}
      </ScrollView>
      {/* </View> */}
    </Container>
  );
};

export default Price;
