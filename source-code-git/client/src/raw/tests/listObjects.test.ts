// @ts-nocheck
/* eslint-env node, browser, jasmine */
import { describe, it, expect, beforeAll } from "vitest"
import { makeFixture } from "./makeFixture.js"
import { listObjects } from "isomorphic-git/internal-apis.js"

describe("listObjects", () => {
	it("listObjects", async () => {
		// Setup
		const { fs, gitdir } = await makeFixture("test-listObjects")
		// Test
		const objects = await listObjects({
			fs,
			cache: {},
			gitdir,
			oids: [
				"c60bbbe99e96578105c57c4b3f2b6ebdf863edbc",
				"e05547ea87ea55eff079de295ff56f483e5b4439",
				"ebdedf722a3ec938da3fd53eb74fdea55c48a19d",
				"0518502faba1c63489562641c36a989e0f574d95",
			],
		})
		expect([...objects]).toMatchInlineSnapshot(`
      [
        "c60bbbe99e96578105c57c4b3f2b6ebdf863edbc",
        "a8103169a3cb5fb457e5232a0e36728511e736b4",
        "1db939d41956405f755e69ab570296c7ed3cec99",
        "bbf3e21f43fa4fe25eb925bfcb7c0434f7c2dc7d",
        "4a58bdcdef3eb91264dfca0279959d98c16568d5",
        "eb1a0c5bb07374f97343010b019aeb3e6be472ee",
        "47967151a5ff9366ca5d86e261c9ceb835d7b722",
        "c675a17ccb1578bca836decf90205fdad743827d",
        "d7b25aab38d0772c4e0da5a88c84f369241e230e",
        "049041e4f5c2216806a69c78b3405d8882a6ce7a",
        "bf45c6a17356154e11e14325624e170201f3f875",
        "557574c5a4e2d6378c3b44e954790e2903a066b7",
        "c5059df27e646eca3c538fcb435bb5d3a5335e3d",
        "0dd30ed7ff2c698dec130d3451c99cdd9bbf1633",
        "60b63f5f7298f29033ec8b5fa19b689062282363",
        "e87c4acef861687deb2728c9f3667a0dc03a8958",
        "e965047ad7c57865823c7d992b1d046ea66edf78",
        "e5b8f9cece335aca583406109216173174068c73",
        "2e957a173810564d93efd6cc48f4149602e8dab0",
        "3830b74f75e13b734e117ac65d04fbd92d7ffa30",
        "51e632299486ed66ac253a467599cfbdfeb6b635",
        "cb089cd89a7d7686d284d8761201649346b5aa1c",
        "d545cdabdbddafca3501d2114506fc86e50e9824",
        "73003f80fc868def28485d20180318454614e9b5",
        "aa0a764f20a691959a981c60de223717d3ddeaa1",
        "699e0fe71ff254b1bec2320356657b024bb88657",
        "302013a7292bac15dd19b1d29049d69f4862561d",
        "9ac4f57c7d98020514ca2baebff511841baa9d93",
        "a003a3623c66cf6262db282d769574c556dafe1d",
        "be395f63b878f28a86a418ae0d6a291e6fa51de9",
        "6a41d6d49eec3593bee14ad19d0a0c0ac08be937",
        "651bd64f6c3716fc8a6e8ba6dcbad2d93337f279",
        "55158d43140549daee24c7d3534107723c0c056a",
        "64280b806c9760fb2313b29cc66dabbd0fe18e26",
        "6d925adc4818a513ae2683a12fe381269f45a7c7",
        "988c291502fc1acafede7f1ac3e913625ce665de",
        "ff53907ca9bd6d5f376188c57bcf1dd4650574c9",
        "a6a2b7186bf8001b510128be269870aac023271a",
        "fe9b7fecc60887755883b5d68fb706985d1f8667",
        "513b4a3e27ebf880868824240f0d294e7e128bdf",
        "fcba58ea4011b37731bba8b142b5d4a515f17839",
        "8dc4edaecb96a628b0d99e6e6ccc9bb2e13f2f54",
        "38e18cba8c86ec3a412c5d1360118e9d19f4042f",
        "c2ff4cb3f08a522ad4df96a664c39a697353e28e",
        "bd8f4c8e205694750d9f0c467accf0b9bb6b17eb",
        "1bc495d4e55ace48ae281ae1ec640e3a17eb443f",
        "2d1486375a20fd5d88290048f94e6f591f198dfc",
        "61107b1197fa6d0852f3460b496e945d7e4a9d83",
        "cf19438b68da32ad4966266b01b2982546fc75c0",
        "582558dc77d80d429fa473b67cedc6d56f1c201d",
        "546e375adc31e156ed6b497c944b7d48da5693bc",
        "7563df69fe82c944d0f6cf38890a4438af3ab8ee",
        "1a874199bec2f87134661592b628fb73a65c02de",
        "949af990f79e1bc45f4c5fbe83985cb81eebe6df",
        "4f95b6947580a4673c51453c5b5836785d987db5",
        "765de32d0e29d7fdc1c7ee597b90e942b9af23d6",
        "239bccdf526f72fd3e50993c91bac022d069e5ae",
        "d9b13df014743e24012795fe3ee07c57ce23326d",
        "8526dac4a73c678fb3d77f2bbbe9dba7c9bc73dd",
        "3debcd9ed0f762dd757d0426c1b7f41c7875e378",
        "cee0a86071305d3440f89da9fc57691ac1e934c9",
        "39989d7eed8a07022d06f3e5ea435ca55100b679",
        "d969fd286799af572eacb3b49c0881e1ea445ed3",
        "45165512f94f2cc9fb0259b6d1b8311cfda3928d",
        "612ee65b07c8a0e3d4f29be1ecc5f93ae26b6938",
        "90695c16a4f16741ddc792cf98d35fbafe0b5915",
        "9e922d7be75abba592701aec08117c1e023945ac",
        "68be1ea418b8a032adac85a15bffe15493be4607",
        "81dc4f14a323823a2a3a160a3d1e93de210b45ea",
        "8d37248c1e0b669d1f35d8cc23072a315eac51dc",
        "259426f84740e41182bbb63b7a2bb99f914c1bb6",
        "5da715b5521d883f4f67e39811c7ee392a28d31a",
        "35cd3a23c15e845849ebc397dd53a2f5692c52bf",
        "8796b53ec4f56869fb579d63ba88b369a8784d54",
        "1f01bbfeddb009fb49b1db0f192cb73d39c8f36d",
        "2c634e11f873c36e72e8415ceb5085de3d9ec507",
        "4f179be70e391c4b1b681dbdbd8126e10afd9800",
        "76ea0cb6ca47b3a49622d23037e8e7de24281ccf",
        "65ea841dbbff2244f144032ddd78d65d96093cb1",
        "79b998ff69792a63fa08d1f4c81bb8797c51d325",
        "9d88857c845dcecdf5628abbfdfb72c25bab9a1f",
        "6e9d67f2a308ca3d580b78c9f5894dde12fe981d",
        "38f6f3fe2ad90ede508cfdbd4c256e13d6bbfa1d",
        "e854a11f6df60bc01c75bebf046f01a0954ebafc",
        "b48ad49aac46081a38b501384b0364d10af9e2db",
        "8b3b108bb2f15275072b2479896d425700434754",
        "ba3a429b8bc8054427ee8209f1d725cc9bd0de3a",
        "7b7571cec88e81dbb74d9d923961d12a8a6e6fde",
        "3bfe1b6d98d0e263ba3bdf53a30766dac50a49a0",
        "4b3d47c6f13cceb2c789ae2c5d867b114d9e7fd3",
        "f79f954746fe5542f951401a43233e57ba959047",
        "d7e5d2d48a2ddf316d000fd6ff82b039a18e4489",
        "a1eb6dd53e364e03d2f51588decc4d64be7d6caa",
        "a3e4b3692cca9dad58987ed92792d283b0a0237d",
        "328e74b65839f7e5a8ae3b54e0b49180a5b7b82b",
        "7a0268b317ebc8deec82ff2481bd12c1d9640d05",
        "a4b2efea01e274f56744342bc9021fbab838f5fc",
        "c0585e66fee320a6d69c25248487464f8fe24dc6",
        "af2500de57708675419c4db313e654bf462e2d67",
        "5171f8a8291d7edc31a6670800d5967cfd6be830",
        "1f3134056c4ec8e09e12f8ce01853cb1ac697a06",
        "592075707f47b954553198633f0bfd57ae50e9e6",
        "92af21f1dc2c6568d473934950b59ae670c82e41",
        "5586cc035bd67b62124e24fcd0b60d7414909c9f",
        "f03ae7b490022507f83729b9227e723ab1587a38",
        "1b1b826853b6152b7e7ec4b39f47ecfb60143372",
        "0b583a1bd52bd7e5579a4f7e47624d990f6ba282",
        "34347c8ae54b8e84947f901d86761875364a9c5a",
        "cecbde44129b2b2537546d252176b49e986e9fda",
        "09df7e67ab764a5cb65a0826a3a0b2a3b3ebf621",
        "df2a3bdb4911011eddf4fa94c6f58857e0f120c7",
        "4605e706ad65f35fcc31b09d2d0d331eb6ae9a2a",
        "ce9f7fb173dc5846e37396df70003b389d311d1b",
        "38863b2030eae29b3efc81115f035a4c4cc95122",
        "20a1a5802c7abda8c76fb2771dbbe53458c8b37e",
        "174ca973d3b327276c73d0cf76698e7acb0f6bee",
        "021beda55a84b562e68610fedfae3b137e22416c",
        "291e89bcd9d3bdd72f11a5a53196151ceb063ba4",
        "2558e35095ac9323ff381c4488a9bb9f7df21486",
        "578c0a3a1363260575f1b1273eb28bd2c1b7dbac",
        "5d7ed63f6b79c3cd9f134f48be2521abfb9c6de1",
        "7c9c3ffd4d4a85bc927e7ea1165c48ab79a4fc81",
        "099fcd63a9a0387c1455717f9eaf50de058bdb5b",
        "72ed82e1d1ddb86e6577c80b8a4dfeb4f99c1975",
        "cc4322b0f6cbf8586f13a6bb8f8f12c51ce795e8",
        "ffa7d2f123658ad92b52d0f2e5198458b5d854d4",
        "39652652308646ebbd3f4291821a47754b1d6297",
        "32c1b1592175ea226ca22482fe7d32e1593d432b",
        "d938addbdc76f7de47775442ca045a2720d48be0",
        "6e31e029d051eb7bacfd86e93f7eab43d4730054",
        "a042f9c1c6de833686ae4a45f92515d028925df7",
        "bbcce901fa961f9df12681ba834c2f91ad4ba7b0",
        "986815d07b173ab7e8a9b40c843464cb52f0d86f",
        "09653a52077d5d747a9dfe64b3a8889c1c095c4d",
        "9d2fb91440d05039be549cd3ba21adad2823608a",
        "95ca9a4a8527d48de831b077dc3114173f125f62",
        "875870fdb5b991aa654783f1b2e6bd2b10b557e3",
        "9f5295803b5e1e8ac460656cb8ba57fef77099de",
        "bc9cf585a68cf44e2c5115ec3e9519c37d2c2e85",
        "b01f344da89c62977b1b4dc7d36cfaa546c630c8",
        "29d2fa6dbccd06134eb8832d1d942f4b29495f3d",
        "fa03bdcc920bdad46598cabd249a1f629cef010c",
        "d8db70567effb326c173b17b2b5b6df22f1c4cc6",
        "0681d1f146a390a27dcc628e982cadb5d7b500bc",
        "d6a0dd9c1c5e4df22b72979a097974ea3b7ba87b",
        "3946e7b3cfb83c71718dc4fab8d50ce6171f2443",
        "c0ef15bf5e38ba0221662569ee5a9aacc4cf6e2d",
        "598b7d6806c264d36776ff80635f95a0188d730d",
        "044b49d6fffc5cbb411784d6baa8b990d3856189",
        "cc8e98a7cfe36a74850eb52fbd2e0ca07a80a508",
        "6cea33858a30385a387c0704031c8be70b92cb4f",
        "e05547ea87ea55eff079de295ff56f483e5b4439",
        "86b9eff27444689c422fa9d3803c574dc402d0d0",
        "4510b2a983dc2253eb5f48a2bbe382b77a7a9be5",
        "6a8cb808568e67faf2f6d675a8738eb45131f787",
        "a7975f328539ded81f4453665bc578a5bd3e10a1",
        "14be9ce5a0358b0c002e3147e1fefa4c0d513926",
        "f2c6495f30d02e90ae465da3e1f5c48649dc77c4",
        "b4c3d831107de93e90405a275230aca61ac05099",
        "34d583663baf662b192a248adc8cca9702dc6dc5",
        "465d59659c40563765956e57d427262acbdc8485",
        "ebdedf722a3ec938da3fd53eb74fdea55c48a19d",
        "1f00cbefb9a1fafb3b3368d5dcc062b19e38db71",
        "0f9a58bfaf1f7808815bd9528d7af2de50dd1455",
        "045d9aa4358916d42ab896547ab21b6014606eb2",
        "992bede683598137b91ef6dae75cc125137c37e0",
        "0518502faba1c63489562641c36a989e0f574d95",
        "54d31620146af42375e0974c2ac2864218d2f197",
        "c3eb866fa2762e6abc36d226f2bb75017afb03e7",
        "fdba2ad440c231d15a2179f729b4b50ab5860df2",
        "018cb07aa9747e34bbd6b6f614a32f72d6e82d55",
        "549a20c0b0149a2a1a06ae433d7a29c95b800718",
      ]
    `)
	})
})
