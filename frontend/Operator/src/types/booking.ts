
// Define the allowed booking status values
export type BookingStatus = "confirmed" | "completed" | "cancelled" | "pending";

// Define the Booking interface
export interface Booking {
  id: string;
  customer: string;
  slot: string;
  startTime: string;
  endTime: string;
  amount: string;
  status: BookingStatus;
}
