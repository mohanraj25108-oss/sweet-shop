import React, { useState } from 'react';
import { X, CheckCircle2, Clock, ChefHat, ShieldCheck, Bike, Sparkles, Phone, MapPin } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateOrderStatus?: (status: Order['status']) => void;
}

const STEPS: { status: Order['status']; label: string; desc: string; icon: any }[] = [
  {
    status: 'Received',
    label: 'Order Confirmed',
    desc: 'Order sent to sweet shop kitchen master',
    icon: CheckCircle2,
  },
  {
    status: 'Kitchen Prep',
    label: 'Fresh Batch Preparation',
    desc: 'Handcrafting & nitrogen-flushing mithai boxes',
    icon: ChefHat,
  },
  {
    status: 'Quality Check',
    label: 'Purity & Weight Verification',
    desc: 'Lab certified desi ghee & tamper sealing',
    icon: ShieldCheck,
  },
  {
    status: 'Out for Delivery',
    label: 'Rider Dispatched',
    desc: 'Express delivery executive on route',
    icon: Bike,
  },
  {
    status: 'Delivered',
    label: 'Delivered Fresh',
    desc: 'Enjoy royal sweetness with your loved ones!',
    icon: Sparkles,
  },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateOrderStatus,
}) => {
  if (!isOpen || !order) return null;

  const currentStepIndex = STEPS.findIndex((s) => s.status === order.status);

  const handleSimulateNext = () => {
    if (!onUpdateOrderStatus) return;
    const nextIdx = Math.min(STEPS.length - 1, currentStepIndex + 1);
    onUpdateOrderStatus(STEPS[nextIdx].status);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-brand-kanti to-purple-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-400 text-purple-950 font-bold px-2 py-0.5 rounded-full uppercase">
                Live Tracking
              </span>
              <span className="text-xs text-purple-200">Order ID: #{order.id}</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-1">
              Estimated Delivery: ~35 Mins
            </h3>
            <p className="text-xs text-purple-200">
              Dispatched from {order.storeLocation}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tracker Stepper */}
        <div className="p-6">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-purple-100 before:z-0">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={step.status} className="relative z-10 flex items-start gap-4">
                  {/* Step Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition ${
                      isPast
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-brand-kanti border-amber-400 text-amber-300 ring-4 ring-purple-100 scale-105'
                        : 'bg-white border-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon size={18} className={isCurrent ? 'animate-pulse' : ''} />
                  </div>

                  {/* Step Description */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          isCurrent
                            ? 'text-brand-kanti text-base'
                            : isPast
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-full animate-bounce">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Rider Details (Visible when Out for Delivery or later) */}
          {currentStepIndex >= 3 && (
            <div className="mt-6 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
                  SK
                </div>
                <div>
                  <p className="font-bold text-gray-900">Suresh Kumar (Express Rider)</p>
                  <p className="text-gray-500 text-[11px]">Insulated thermal delivery box • Electric Scooter</p>
                </div>
              </div>
              <a
                href="tel:+919845012345"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                <Phone size={13} />
                <span>Call Rider</span>
              </a>
            </div>
          )}

          {/* Delivery Address & Order Recap */}
          <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <span className="font-bold text-gray-800 flex items-center gap-1 mb-1">
                <MapPin size={13} className="text-brand-kanti" />
                <span>Delivery Address:</span>
              </span>
              <p className="text-gray-600 pl-4 leading-relaxed">{order.deliveryAddress}</p>
              <p className="text-gray-600 pl-4 mt-0.5 font-semibold">Contact: {order.phone}</p>
            </div>

            <div>
              <span className="font-bold text-gray-800 flex items-center gap-1 mb-1">
                <Clock size={13} className="text-brand-kanti" />
                <span>Payment &amp; Slot:</span>
              </span>
              <p className="text-gray-600 pl-4">{order.paymentMethod}</p>
              <p className="text-gray-600 pl-4 font-semibold text-brand-kanti">
                Total Paid: ₹{order.totalAmount}
              </p>
            </div>
          </div>

          {/* SaaS Simulation Trigger */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={handleSimulateNext}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline flex items-center gap-1"
            >
              <span>Simulate Next Stage in Live Tracker</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition"
            >
              Close Window
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

