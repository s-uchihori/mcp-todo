import type { Validator } from "@showichiro/validators";
import { priorities, type Priority } from "./types.ts";

// カスタムバリデーター: 優先度の文字列チェック
export const $priority: Validator<Priority> = (
  val: unknown,
): val is Priority => {
  return typeof val === "string" && priorities.includes(val as Priority);
};

// Tests
Deno.test("$priority validator - valid priorities", () => {
  priorities.forEach((priority) => {
    if (!$priority(priority)) {
      throw new Error(`Priority ${priority} should be valid`);
    }
  });
});

Deno.test("$priority validator - invalid values", () => {
  const invalidValues = [null, undefined, 123, "invalid", "z", "", [], {}];

  invalidValues.forEach((value) => {
    if ($priority(value)) {
      throw new Error(`Value ${value} should be invalid`);
    }
  });
});
