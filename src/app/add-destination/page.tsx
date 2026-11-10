"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { SaveIcon, Trash2Icon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "@/components/ui/toast";

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City",
  "Nature",
  "Luxury",
] as const;

/** Local date (yyyy-mm-dd) so the departure date can't be in the past. */
const today = (() => {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
})();

/** Shared input styling matching the mock (light gray fill, rounded, 40px tall). */
const fieldClassName = "h-10 rounded-md bg-muted";

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.destinationName.trim()) {
    errors.destinationName = "Destination name is required.";
  }

  if (!form.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!form.category) {
    errors.category = "Please select a category.";
  }

  if (!form.price.trim()) {
    errors.price = "Price is required.";
  } else if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = "Enter a price greater than 0.";
  }

  if (!form.duration.trim()) {
    errors.duration = "Duration is required.";
  }

  if (!form.departureDate) {
    errors.departureDate = "Departure date is required.";
  } else if (form.departureDate < today) {
    errors.departureDate = "Departure date can't be in the past.";
  }

  if (!form.imageUrl.trim()) {
    errors.imageUrl = "Image URL is required.";
  } else {
    try {
      const url = new URL(form.imageUrl.trim());
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        errors.imageUrl = "Enter an http(s) URL.";
      }
    } catch {
      errors.imageUrl = "Enter a valid URL.";
    }
  }

  if (!form.description.trim()) {
    errors.description = "Description is required.";
  } else if (form.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters.";
  }

  return errors;
}

function FieldRow({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} className="font-semibold">
        {label}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const AddDestinationPage = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/add-destination", {
        method:"POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(form)
    })

    const data = await res.json();
    console.log(data);

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    toast.add({
      type: "success",
      title: "Travel package added",
      description: `"${form.destinationName.trim()}" is ready to be published.`,
    });
    setForm(initialForm);
    setErrors({});
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
  };

  return (
    <main className="flex flex-1 flex-col px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-light md:text-4xl">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-10 w-full max-w-4xl [--card-spacing:0px]">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col">
            <CardContent className="flex flex-col gap-5 px-6 py-6">
              <FieldRow
                label="Destination Name"
                htmlFor="destinationName"
                error={errors.destinationName}
              >
                <Input
                  id="destinationName"
                  name="destinationName"
                  placeholder="Bali Paradise"
                  value={form.destinationName}
                  onChange={(event) =>
                    updateField("destinationName", event.target.value)
                  }
                  aria-invalid={errors.destinationName ? true : undefined}
                  className={fieldClassName}
                />
              </FieldRow>

              <div className="grid gap-5 sm:grid-cols-2">
                <FieldRow
                  label="Country"
                  htmlFor="country"
                  error={errors.country}
                >
                  <Input
                    id="country"
                    name="country"
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={(event) =>
                      updateField("country", event.target.value)
                    }
                    aria-invalid={errors.country ? true : undefined}
                    className={fieldClassName}
                  />
                </FieldRow>

                <FieldRow
                  label="Category"
                  htmlFor="category"
                  error={errors.category}
                >
                  <Select
                    value={form.category || null}
                    onValueChange={(value) =>
                      updateField("category", value ?? "")
                    }
                  >
                    <SelectTrigger
                      id="category"
                      aria-invalid={errors.category ? true : undefined}
                      className={cn(
                        fieldClassName,
                        "w-full justify-between rounded-md bg-muted",
                      )}
                    >
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldRow>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FieldRow
                  label="Price (USD)"
                  htmlFor="price"
                  error={errors.price}
                >
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    step="1"
                    inputMode="decimal"
                    placeholder="e.g., 1299"
                    value={form.price}
                    onChange={(event) =>
                      updateField("price", event.target.value)
                    }
                    aria-invalid={errors.price ? true : undefined}
                    className={fieldClassName}
                  />
                </FieldRow>

                <FieldRow
                  label="Duration"
                  htmlFor="duration"
                  error={errors.duration}
                >
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    value={form.duration}
                    onChange={(event) =>
                      updateField("duration", event.target.value)
                    }
                    aria-invalid={errors.duration ? true : undefined}
                    className={fieldClassName}
                  />
                </FieldRow>
              </div>

              <FieldRow
                label="Departure Date"
                htmlFor="departureDate"
                error={errors.departureDate}
              >
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  min={today}
                  placeholder="mm/dd/yyyy"
                  value={form.departureDate}
                  onChange={(event) =>
                    updateField("departureDate", event.target.value)
                  }
                  aria-invalid={errors.departureDate ? true : undefined}
                  className={fieldClassName}
                />
              </FieldRow>

              <FieldRow
                label="Image URL"
                htmlFor="imageUrl"
                error={errors.imageUrl}
              >
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                  aria-invalid={errors.imageUrl ? true : undefined}
                  className={fieldClassName}
                />
              </FieldRow>

              <FieldRow
                label="Description"
                htmlFor="description"
                error={errors.description}
              >
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the travel experience..."
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  aria-invalid={errors.description ? true : undefined}
                  className="min-h-28 rounded-md bg-muted"
                />
              </FieldRow>
            </CardContent>

            <CardFooter className="justify-end gap-3 border-t bg-background px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="h-10 gap-2 rounded-md border-destructive/30 px-4 text-destructive hover:bg-destructive/5 hover:text-destructive"
              >
                <Trash2Icon aria-hidden="true" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 gap-2 rounded-md bg-brand px-4 text-white hover:bg-brand/90"
              >
                <SaveIcon aria-hidden="true" />
                Add Travel Package
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Toaster />
    </main>
  );
};

export default AddDestinationPage;
