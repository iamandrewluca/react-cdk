
import { AppProps } from "@aws-cdk/core"
import { AssetStagingProps } from "@aws-cdk/core"
import { CfnCodeDeployBlueGreenHookProps } from "@aws-cdk/core"
import { CfnConditionProps } from "@aws-cdk/core"
import { CfnCustomResourceProps } from "@aws-cdk/core"
import { CfnElementProps } from "@aws-cdk/core"
import { CfnHookProps } from "@aws-cdk/core"
import { CfnIncludeProps } from "@aws-cdk/core"
import { CfnJsonProps } from "@aws-cdk/core"
import { CfnMacroProps } from "@aws-cdk/core"
import { CfnMappingProps } from "@aws-cdk/core"
import { CfnModuleDefaultVersionProps } from "@aws-cdk/core"
import { CfnModuleVersionProps } from "@aws-cdk/core"
import { CfnOutputProps } from "@aws-cdk/core"
import { CfnParameterProps } from "@aws-cdk/core"
import { CfnPublicTypeVersionProps } from "@aws-cdk/core"
import { CfnPublisherProps } from "@aws-cdk/core"
import { CfnRefElementProps } from "@aws-cdk/core"
import { CfnResourceProps } from "@aws-cdk/core"
import { CfnResourceDefaultVersionProps } from "@aws-cdk/core"
import { CfnResourceVersionProps } from "@aws-cdk/core"
import { CfnRuleProps } from "@aws-cdk/core"
import { CfnStackProps } from "@aws-cdk/core"
import { CfnStackSetProps } from "@aws-cdk/core"
import { CfnTypeActivationProps } from "@aws-cdk/core"
import { CfnWaitConditionProps } from "@aws-cdk/core"
import { CfnWaitConditionHandleProps } from "@aws-cdk/core"
import { ConstructProps } from "@aws-cdk/core"
import { CustomResourceProps } from "@aws-cdk/core"
import { CustomResourceProviderProps } from "@aws-cdk/core"
import { NestedStackProps } from "@aws-cdk/core"
import { ResourceProps } from "@aws-cdk/core"
import { StackProps } from "@aws-cdk/core"
import { StageProps } from "@aws-cdk/core"

export const App = "@aws-cdk/core.App"
export const AssetStaging = "@aws-cdk/core.AssetStaging"
export const CfnCodeDeployBlueGreenHook = "@aws-cdk/core.CfnCodeDeployBlueGreenHook"
export const CfnCondition = "@aws-cdk/core.CfnCondition"
export const CfnCustomResource = "@aws-cdk/core.CfnCustomResource"
export const CfnElement = "@aws-cdk/core.CfnElement"
export const CfnHook = "@aws-cdk/core.CfnHook"
export const CfnInclude = "@aws-cdk/core.CfnInclude"
export const CfnJson = "@aws-cdk/core.CfnJson"
export const CfnMacro = "@aws-cdk/core.CfnMacro"
export const CfnMapping = "@aws-cdk/core.CfnMapping"
export const CfnModuleDefaultVersion = "@aws-cdk/core.CfnModuleDefaultVersion"
export const CfnModuleVersion = "@aws-cdk/core.CfnModuleVersion"
export const CfnOutput = "@aws-cdk/core.CfnOutput"
export const CfnParameter = "@aws-cdk/core.CfnParameter"
export const CfnPublicTypeVersion = "@aws-cdk/core.CfnPublicTypeVersion"
export const CfnPublisher = "@aws-cdk/core.CfnPublisher"
export const CfnRefElement = "@aws-cdk/core.CfnRefElement"
export const CfnResource = "@aws-cdk/core.CfnResource"
export const CfnResourceDefaultVersion = "@aws-cdk/core.CfnResourceDefaultVersion"
export const CfnResourceVersion = "@aws-cdk/core.CfnResourceVersion"
export const CfnRule = "@aws-cdk/core.CfnRule"
export const CfnStack = "@aws-cdk/core.CfnStack"
export const CfnStackSet = "@aws-cdk/core.CfnStackSet"
export const CfnTypeActivation = "@aws-cdk/core.CfnTypeActivation"
export const CfnWaitCondition = "@aws-cdk/core.CfnWaitCondition"
export const CfnWaitConditionHandle = "@aws-cdk/core.CfnWaitConditionHandle"
export const Construct = "@aws-cdk/core.Construct"
export const CustomResource = "@aws-cdk/core.CustomResource"
export const CustomResourceProvider = "@aws-cdk/core.CustomResourceProvider"
export const NestedStack = "@aws-cdk/core.NestedStack"
export const Resource = "@aws-cdk/core.Resource"
export const Stack = "@aws-cdk/core.Stack"
export const Stage = "@aws-cdk/core.Stage"

declare global {
	namespace JSX {
		interface IntrinsicElements {
			[App]: AppProps
			[AssetStaging]: AssetStagingProps
			[CfnCodeDeployBlueGreenHook]: CfnCodeDeployBlueGreenHookProps
			[CfnCondition]: CfnConditionProps
			[CfnCustomResource]: CfnCustomResourceProps
			[CfnElement]: CfnElementProps
			[CfnHook]: CfnHookProps
			[CfnInclude]: CfnIncludeProps
			[CfnJson]: CfnJsonProps
			[CfnMacro]: CfnMacroProps
			[CfnMapping]: CfnMappingProps
			[CfnModuleDefaultVersion]: CfnModuleDefaultVersionProps
			[CfnModuleVersion]: CfnModuleVersionProps
			[CfnOutput]: CfnOutputProps
			[CfnParameter]: CfnParameterProps
			[CfnPublicTypeVersion]: CfnPublicTypeVersionProps
			[CfnPublisher]: CfnPublisherProps
			[CfnRefElement]: CfnRefElementProps
			[CfnResource]: CfnResourceProps
			[CfnResourceDefaultVersion]: CfnResourceDefaultVersionProps
			[CfnResourceVersion]: CfnResourceVersionProps
			[CfnRule]: CfnRuleProps
			[CfnStack]: CfnStackProps
			[CfnStackSet]: CfnStackSetProps
			[CfnTypeActivation]: CfnTypeActivationProps
			[CfnWaitCondition]: CfnWaitConditionProps
			[CfnWaitConditionHandle]: CfnWaitConditionHandleProps
			[Construct]: ConstructProps
			[CustomResource]: CustomResourceProps
			[CustomResourceProvider]: CustomResourceProviderProps
			[NestedStack]: NestedStackProps
			[Resource]: ResourceProps
			[Stack]: StackProps
			[Stage]: StageProps
		}
	}
}
