import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Shield } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface CheckoutPageProps {
  onBack?: () => void;
}

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <div className="size-5 bg-blue-400 rounded-sm" />
            </div>
            <span className="text-xl">Recall</span>
          </div>
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-slate-400 hover:text-white"
            >
              Back
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-white mb-8 md:mb-12">Secure Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Package Summary */}
          <div className="space-y-6">
            {/* Package Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <div className="bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 rounded-2xl h-48 mb-6" />
              
              <p className="text-slate-400 text-sm mb-2">Package Summary</p>
              <h3 className="text-white mb-2">Recall Pro 50GB</h3>
              <p className="text-slate-400">Unlimited Calls & Texts, 5G Speed</p>
              <p className="text-slate-400">12-Month Plan</p>
            </div>

            {/* Price Breakdown */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <h3 className="text-white mb-6">Price Breakdown</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Recall Pro 50GB Plan</span>
                  <span className="text-white">$45.00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">One-time Activation Fee</span>
                  <span className="text-white">$10.00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Taxes & Fees</span>
                  <span className="text-white">$5.00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400">Loyalty Discount</span>
                  <span className="text-emerald-400">-$5.00</span>
                </div>

                <div className="border-t border-slate-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Total Due Today</span>
                    <span className="text-white text-2xl">$55.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
              <h3 className="text-white mb-6">Payment Method</h3>

              {/* Payment Method Selection */}
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-6">
                <div
                  className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-600/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <RadioGroupItem value="card" id="card" className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor="card" className="text-white cursor-pointer">
                        Credit/Debit Card
                      </Label>
                      <p className="text-slate-400 text-sm">Pay with your card</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="bg-blue-600 rounded-full p-1">
                      <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>

                <div
                  className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-600 bg-blue-600/10'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <RadioGroupItem value="paypal" id="paypal" className="mt-0.5" />
                    <div className="flex-1">
                      <Label htmlFor="paypal" className="text-white cursor-pointer">
                        PayPal
                      </Label>
                      <p className="text-slate-400 text-sm">Checkout securely with PayPal</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName" className="text-slate-300 mb-2 block">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-slate-300 mb-2 block">
                      Card Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl pr-12"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-slate-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-slate-300 mb-2 block">
                        Expiration Date
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM / YY"
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-slate-300 mb-2 block">
                        CVC
                      </Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="saveCard"
                      checked={saveCard}
                      onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                      className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor="saveCard"
                      className="text-slate-300 text-sm cursor-pointer"
                    >
                      Save this card for future payments
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-blue-900/50 hover:bg-blue-900/70 text-blue-400 rounded-xl py-6 gap-2 border border-blue-800">
                <Shield className="size-5" />
                Safe purchase — instant activation
              </Button>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 gap-2">
                <Lock className="size-5" />
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
