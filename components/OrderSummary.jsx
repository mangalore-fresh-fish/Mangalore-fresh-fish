import {
  PlusIcon,
  SquarePenIcon,
  XIcon,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import React, { useState } from "react";
import AddressModal from "./AddressModal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { fetchCart } from "@/lib/features/cart/cartSlice";

const OrderSummary = ({ totalPrice, items }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const addressList = useSelector((state) => state.address.list);
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResendPopup, setShowResendPopup] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🟢 Open WhatsApp and trigger confirmation
  const handleOpenWhatsApp = async () => {
    if (!user) return toast.error("Please login to place an order");
    if (!selectedAddress) return toast.error("Please select an address");

    const storeNumber = process.env.NEXT_PUBLIC_STORE_WHATSAPP_NUMBER;
    if (!storeNumber) return toast.error("Store WhatsApp number not set");

    // [FIX] Reverted to your original message template
    const itemsList = items
      .map((i) => `• ${i.name} (Qty: ${i.quantity})`)
      .join("%0A"); // %0A is a URL-encoded newline

    const addressString = `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.zip}`;

    const messageBody =
      `📦 *Order Summary*%0A` +
      `------------------------------------%0A` +
      `Hello! 👋 I'd like to place a new order.%0A%0A` +
      `📍 *Delivery Information*%0A` +
      `------------------------------------%0A` +
      `👤 *Name:* ${selectedAddress.name}%0A` +
      `📞 *Phone:* ${selectedAddress.phone}%0A` +
      `🏠 *Address:* ${addressString}%0A%0A` +
      `🛒 *Cart Details*%0A` +
      `----------------------------%0A` +
      `${itemsList}%0A%0A` +
      `💳 *Payment Information*%0A` +
      `----------------------------%0A` +
      `💰 *Method:* ${paymentMethod}%0A` +
      `💵 *Total:* ${currency}${totalPrice.toLocaleString()}%0A%0A` +
      `✅ Please confirm this order.%0A` +
      `Thank you for shopping with us! 🌊🐟`;

    window.open(
      `https://api.whatsapp.com/send?phone=${storeNumber}&text=${messageBody}`,
      "_blank"
    );

    // Save a complete snapshot of the order
    setPendingOrderData({
      addressId: selectedAddress.id,
      items: items,
      paymentMethod: paymentMethod,
      phone: selectedAddress.phone,
      totalPrice: totalPrice,
    });
    setShowConfirmModal(true);
  };

  // ✅ Confirm order
  const handleConfirmOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!pendingOrderData) return;
      const token = await getToken();
      await axios.post("/api/orders", pendingOrderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("❤️Your order is confirmed!🐟 ");
      setShowConfirmModal(false);
      router.push("/orders");
      dispatch(fetchCart({ getToken }));
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
      setIsSubmitting(false);
    }
  };

  // 🐟 Resend order (Bulletproof version)
  const handleResendOrder = () => {
    try {
      if (
        !pendingOrderData ||
        !pendingOrderData.items ||
        !Array.isArray(pendingOrderData.items) ||
        typeof pendingOrderData.totalPrice !== "number" ||
        !pendingOrderData.phone
      ) {
        toast.error("Order snapshot not found. Please try again from the cart.");
        return;
      }

      const storeNumber = process.env.NEXT_PUBLIC_STORE_WHATSAPP_NUMBER;
      if (!storeNumber) {
        toast.error("Store WhatsApp number not set");
        return;
      }

      const {
        items: pendingItems,
        paymentMethod: pendingPayment,
        phone: pendingPhone,
        totalPrice: pendingTotal,
      } = pendingOrderData;

      if (!addressList || !Array.isArray(addressList)) {
        toast.error("Address list is not loaded.");
        return;
      }

      const selected = addressList.find((a) => a.phone === pendingPhone);

      if (!selected) {
        toast.error("Could not find address details to resend.");
        return;
      }

      // [FIX] Reverted to your original message template
      const itemsList = pendingItems
        .map((i) => `• ${i.name} (Qty: ${i.quantity})`)
        .join("%0A");

      const addressString = `${selected.street}, ${selected.city}, ${selected.state} - ${selected.zip}`;

      const message =
        `📦 *Order Summary*%0A` +
        `------------------------------------%0A` +
        `Hello! 👋 I'd like to place a new order.%0A%0A` +
        `📍 *Delivery Information*%0A` +
        `------------------------------------%0A` +
        `👤 *Name:* ${selected.name}%0A` +
        `📞 *Phone:* ${selected.phone}%0A` +
        `🏠 *Address:* ${addressString}%0A%0A` +
        `🛒 *Cart Details*%0A` +
        `----------------------------%0A` +
        `${itemsList}%0A%0A` +
        `💳 *Payment Information*%0A` +
        `----------------------------%0A` +
        `💰 *Method:* ${pendingPayment}%0A` +
        `💵 *Total:* ${currency}${pendingTotal.toLocaleString()}%0A%0A` +
        `✅ Please confirm this order.%0A` +
        `Thank you for shopping with us! 🌊🐟`;

      window.open(
        `https://api.whatsapp.com/send?phone=${storeNumber}&text=${message}`,
        "_blank"
      );
      setShowResendPopup(false);
    } catch (error) {
      console.error("Error in handleResendOrder:", error);
      toast.error("An unexpected error occurred. Please check console.");
    }
  };

  return (
    <div className="w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-600 text-sm rounded-xl p-7">
      <h2 className="text-xl font-medium text-slate-600">📦 Request Summary</h2>

      <p className="text-slate-400 text-xs my-4">💳 Payment Method</p>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          id="COD"
          onChange={() => setPaymentMethod("COD")}
          checked={paymentMethod === "COD"}
          className="accent-gray-500"
        />
        <label htmlFor="COD" className="cursor-pointer">
          Cash on Delivery (COD)
        </label>
      </div>

      <div className="my-4 py-4 border-y border-slate-200 text-slate-400">
        <p>📍 Delivery Information</p>
        {selectedAddress ? (
          <div className="flex flex-col gap-2 mt-2">
            <p>
              <strong>Name:</strong> {selectedAddress.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedAddress.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedAddress.street},{" "}
              {selectedAddress.city}, {selectedAddress.state},{" "}
              {selectedAddress.zip}
            </p>
            <SquarePenIcon
              onClick={() => setSelectedAddress(null)}
              className="cursor-pointer text-slate-600 hover:text-slate-800"
              size={18}
            />
          </div>
        ) : (
          <div>
            {addressList.length > 0 && (
              <select
                className="border border-slate-400 p-2 w-full my-3 outline-none rounded"
                onChange={(e) =>
                  setSelectedAddress(addressList[e.target.value])
                }
              >
                <option value="">Select Address</option>
                {addressList.map((address, index) => (
                  <option key={index} value={index}>
                    {address.name} ({address.phone})
                  </option>
                ))}
              </select>
            )}
            <button
              className="flex items-center gap-1 text-slate-600 mt-1"
              onClick={() => setShowAddressModal(true)}
            >
              ➕ Add Address <PlusIcon size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="pb-4 border-b border-slate-200 flex justify-between">
        <p>Total:</p>
        <p className="font-medium text-right">
          {currency}
          {totalPrice.toLocaleString()}
        </p>
      </div>

      <button
        onClick={handleOpenWhatsApp}
        className="w-full bg-slate-700 text-white py-2.5 rounded hover:bg-slate-900 active:scale-95 transition-all mt-4"
      >
        🛒 Place Order via WhatsApp
      </button>

      {showAddressModal && (
        <AddressModal setShowAddressModal={setShowAddressModal} />
      )}

      {/* ============================================= */}
      {/* START: CONFIRMATION MODAL (showConfirmModal) */}
      {/* ============================================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn">
          {/* [FIX] Added `group` for hover animation and `overflow-hidden` */}
          <div className="group relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl animate-modalIn">
            {/* [FIX] Added `relative z-10` to put content ABOVE waves */}
            <div className="p-8 text-center relative z-10">
              {/* Icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
                {/* [NEW] Added hover-scale animation to icon */}
                <HelpCircle
                  className="h-6 w-6 text-cyan-600 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={2.5}
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900 mt-5">
                Confirm Your Order
              </h2>

              {/* Message */}
              <p className="text-gray-500 text-sm mb-7 mt-2 leading-relaxed">
                Have you successfully sent the order on WhatsApp? Confirming
                will save this order to your account.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-medium shadow-sm transition-all text-base ${
                    isSubmitting
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-cyan-600 text-white hover:bg-cyan-700 active:scale-[0.98]"
                  }`}
                >
                  ✅ Yes, Confirm Order
                </button>

                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setShowResendPopup(true);
                  }}
                  className="w-full px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all text-base"
                >
                  ❌ No, Not Yet
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full px-6 py-2 rounded-lg font-medium text-gray-500  active:scale-[0.98] transition-all text-base"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Decorative Wave Effect */}
            {/* [FIX] Removed z-index. Will sit at z-auto (behind z-10 content) */}
            <div className="absolute bottom-0 left-0 w-full opacity-30">
              <svg
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#0891b2" // cyan-600
                  fillOpacity="0.5"
                  d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,117.3C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            {/* [FIX] Removed z-index. Will sit at z-auto (behind z-10 content) */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#0891b2" // cyan-600
                  fillOpacity="1"
                  d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,229.3C672,224,768,160,864,149.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>

            {/* Close Button (z-20 to be safe) */}
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XIcon size={22} />
            </button>
          </div>
        </div>
      )}
      {/* =========================================== */}
      {/* END: CONFIRMATION MODAL */}
      {/* =========================================== */}

      {/* ============================================= */}
      {/* START: RESEND MODAL (showResendPopup) */}
      {/* ============================================= */}
      {showResendPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn">
          {/* [FIX] Added `group` for hover animation and `overflow-hidden` */}
          <div className="group relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl animate-modalIn">
            {/* [FIX] Added `relative z-10` to put content ABOVE waves */}
            <div className="p-8 text-center relative z-10">
              {/* Icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                {/* [NEW] Added hover-scale animation to icon */}
                <RefreshCw
                  className="h-6 w-6 text-orange-600 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={2.5}
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-5">
                Resend Your Order
              </h2>

              <p className="text-gray-500 text-sm mb-6 mt-2 leading-relaxed">
                You haven’t completed your order yet. Review your items below
                and resend via WhatsApp.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 border border-gray-200 mb-6 text-left">
                {pendingOrderData?.items?.map((item, i) => (
                  <p key={i}>
                    • {item.name} (x{item.quantity})
                  </p>
                ))}
                <p className="mt-3 font-medium">
                  💳 {pendingOrderData?.paymentMethod}
                  <br />💵 {currency}
                  {(pendingOrderData?.totalPrice ?? 0).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
               
                <button
                  onClick={() => setShowResendPopup(false)}
                  className="w-full sm:flex-1 px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all text-base"
                >
                  Cancel
                </button>
                 <button
                  onClick={handleResendOrder}
                  className="w-full sm:flex-1 px-6 py-3 rounded-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 active:scale-[0.98] transition-all text-base shadow-sm"
                >
                  🔄 Resend via WhatsApp
                </button>
              </div>
            </div>

            {/* Decorative Wave Effect */}
            {/* [FIX] Removed z-index. Will sit at z-auto (behind z-10 content) */}
            <div className="absolute bottom-0 left-0 w-full opacity-30">
              <svg
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#0891b2" // cyan-600
                  fillOpacity="0.5"
                  d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,117.3C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
            {/* [FIX] Removed z-index. Will sit at z-auto (behind z-10 content) */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="#0891b2" // cyan-600
                  fillOpacity="1"
                  d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,229.3C672,224,768,160,864,149.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>

            {/* Close Button (z-20 to be safe) */}
            <button
              onClick={() => setShowResendPopup(false)}
              className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XIcon size={22} />
            </button>
          </div>
        </div>
      )}
      {/* =========================================== */}
      {/* END: UPDATED RESEND MODAL */}
      {/* =========================================== */}
    </div>
  );
};

export default OrderSummary;