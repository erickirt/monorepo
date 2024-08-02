import { Type, type Static } from "@sinclair/typebox"

export type VariableReference = Static<typeof VariableReference>
export const VariableReference = Type.Object({
	type: Type.Literal("variable"),
	name: Type.String(),
})

export type Literal = Static<typeof Literal>
export const Literal = Type.Object({
	type: Type.Literal("literal"),
	name: Type.String(),
})

export type Option = Static<typeof Option>
export const Option = Type.Object({
	name: Type.String(),
	value: Type.Union([Literal, VariableReference]),
})

export type FunctionAnnotation = Static<typeof FunctionAnnotation>
export const FunctionAnnotation = Type.Object({
	type: Type.Literal("function"),
	name: Type.String(),
	options: Type.Array(Option),
})

export type Expression = Static<typeof Expression>
export const Expression = Type.Object({
	type: Type.Literal("expression"),
	arg: Type.Union([VariableReference, Literal]),
	annotation: Type.Optional(FunctionAnnotation),
})

export type Text = Static<typeof Text>
export const Text = Type.Object({
	type: Type.Literal("text"),
	value: Type.String(),
})

export type Declaration = Static<typeof Declaration>
export const Declaration = Type.Object({
	type: Type.Literal("input"),
	name: Type.String(),
	value: Expression,
})

export type Pattern = Static<typeof Pattern>
export const Pattern = Type.Array(Type.Union([Text, Expression]))

export type Bundle = Static<typeof Bundle>
export const Bundle = Type.Object({
	id: Type.String(),
	alias: Type.Record(Type.String(), Type.String()),
})

export type Message = Static<typeof Message>
export const Message = Type.Object({
	id: Type.String(),
	bundleId: Type.String(),
	locale: Type.String(),
	declarations: Type.Array(Declaration),
	selectors: Type.Array(Expression),
})

export type Variant = Static<typeof Variant>
export const Variant = Type.Object({
	id: Type.String(),
	messageId: Type.String(),
	match: Type.Any(), // TODO: Use appropriate Typebox type for JSONColumnType<Record<Expression["arg"]["name"], string>>
	pattern: Pattern,
})
