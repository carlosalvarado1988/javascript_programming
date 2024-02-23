import { BalancedExpressionsWithStack } from "./classes/balancedExpressionsWithStack.js";

const balancedExp = new BalancedExpressionsWithStack();
console.log('balancedExp.isOpenSymbol("a")', balancedExp.isOpenSymbol("a"));
console.log('balancedExp.isOpenSymbol("{")', balancedExp.isOpenSymbol("{"));
console.log(
  " balancedExp.check([20, (30), <40>]):",
  balancedExp.check("[20, (30), <40>]")
);
console.log(
  " balancedExp.check([20, (30)), <40>]):",
  balancedExp.check("[20, (30)), <40>]")
);
console.log(
  " balancedExp.check([20, (30)), <40]):",
  balancedExp.check("[20, (30), <40]")
);
console.log(
  " balancedExp.check([([20, <(30)>, <40>])]):",
  balancedExp.check("[([20, <(30)>, <40>])]")
);
console.log(" balancedExp.check(]20]):", balancedExp.check("]20]"));
