"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { VoucherValidation } from "@/lib/validations/voucher";
import { DatePicker } from "../DatePicker";
import { useState } from "react";

const VoucherForm = ({
  _id,
  minimumOrderValue: existingMinimumOrderValue,
  discount: existingDiscount,
  code: existingCode,
  description: existingDescription,
  startDate: existingStartDate,
  endDate: existingEndDate,
  usageLimit: existingUsageLimit,
  usageCount: existingUsageCount,
  products: existingProducts,
  appliedAll: existingAppliedAll,
}: {
  _id?: string;
  minimumOrderValue?: number;
  discount?: number;
  code?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  usageLimit?: number;
  usageCount?: number;
  products?: string[];
  appliedAll?: boolean;
}) => {
  const router = useRouter();

  const [usageCount, setUsageCount] = useState<number>(existingUsageCount || 0);
  const [usageLimit, setUsageLimit] = useState<number>(existingUsageLimit || 0);
  const [discount, setDiscount] = useState<number>(existingDiscount || 0);
  const [minimum, setMinimum] = useState<number>(existingMinimumOrderValue || 0);

  const form = useForm<z.infer<typeof VoucherValidation>>({
    resolver: zodResolver(VoucherValidation),
    defaultValues: {
      minimumOrderValue: minimum || 0,
      discount: discount || 0,
      code: existingCode || "",
      description: existingDescription || "",
      startDate: existingStartDate || new Date(),
      endDate: existingEndDate || new Date(),
      usageLimit: usageCount || 0,
      usageCount: usageLimit || 0,
      products: existingProducts || [],
      appliedAll: existingAppliedAll || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof VoucherValidation>) => {
    if (_id) {
      await axios.put(`/api/dashboard/vouchers/${_id}`, values).then((res) => {
        console.log(res.data);
      });
    } else {
      await axios.post("/api/dashboard/vouchers", values).then((res) => {
        console.log(res.data);
      });
    }
    // router.push("/dashboard/vouchers");
  };

  return (
    <div className="mt-4 w-full m-4">
      <h1 className="py-4 text-3xl font-bold  ">ADD VOUCHER</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="minimumOrderValue"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Minimum order value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value} // Sử dụng field.value thay vì price
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      field.onChange(newValue); // Kích hoạt hàm onChange của field và truyền giá trị mới
                      setMinimum(newValue);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="discount"
                    type="number"
                    value={field.value} // Sử dụng field.value thay vì price
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      field.onChange(newValue); // Kích hoạt hàm onChange của field và truyền giá trị mới
                      setDiscount(newValue);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input type="text" className="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usageLimit"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value} // Sử dụng field.value thay vì price
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      field.onChange(newValue); // Kích hoạt hàm onChange của field và truyền giá trị mới
                      setUsageLimit(newValue); // Cập nhật giá trị mới cho price
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usageCount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Usage Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value} // Sử dụng field.value thay vì price
                    onChange={(e) => {
                      const newValue = parseFloat(e.target.value);
                      field.onChange(newValue); // Kích hoạt hàm onChange của field và truyền giá trị mới
                      setUsageCount(newValue); // Cập nhật giá trị mới cho price
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appliedAll"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Applied to All Products</FormLabel>
                <FormControl>
                  <Checkbox
                    value={field.value as unknown as string}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button onSubmit={
            () => {
              if (form.formState.isSubmitting) return;
              onSubmit(form.getValues())
            }
          } type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default VoucherForm;
