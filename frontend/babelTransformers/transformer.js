/**
 * Created by jovi on 12/12/15.
 */
// babel cook book: https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
// es5 spec in ESTree: https://github.com/estree/estree/blob/master/spec.md
// es6 spec in ESTree: https://github.com/estree/estree/blob/master/es6.md#importdeclaration
// http://astexplorer.net/


const startsWith = require('lodash/startsWith');
const CWD_PREFIX = '~';

import features from './scripts/features';


const Visitor_if_statement = {
    IfStatement: {
        enter(nodePath, pluginPass) {
            const node = nodePath.node;
            let feature = null;
            let isFeatureStatement = false;
            let featureOnStatements = null;
            let featureOffStatements = null;

            const test = node.test;
            if (test.type === 'CallExpression' && test.callee.name === 'features') {
                isFeatureStatement = true;
                feature = test.arguments[0].value;
                featureOffStatements = node.alternate && node.alternate.body;
                featureOnStatements = node.consequent && node.consequent.body;
                console.log('call')
            } else if (test.type === 'UnaryExpression' && test.argument.type === 'CallExpression' && test.argument.callee.name === 'features') {
                isFeatureStatement = true;
                feature = test.argument.arguments[0].value;
                featureOnStatements = node.alternate && node.alternate.body;
                featureOffStatements = node.consequent && node.consequent.body;
                console.log('unary')
            }
            if (isFeatureStatement) {
                console.log(`features(${feature}) ====> ${features(feature) + ''}`);
                if (features(feature) && featureOnStatements) {
                    nodePath.replaceWithMultiple(featureOnStatements);
                } else if (!features(feature) && featureOffStatements) {
                    nodePath.replaceWithMultiple(featureOffStatements);
                }
            }

        }
    }
};

export default function({types:t}) {
    const cwd = process.cwd();
    return {
        visitor: {
            ImportDeclaration: {
                enter(nodePath, pluginPass) {
                    const node = nodePath.node;
                    if (!t.isLiteral(node.source)) {
                        return;
                    }

                    console.log('-------> import triggered');

                    const specifier = node.specifiers.filter(s=>s.local.name === 'features');
                    if (specifier.length > 0) {
                        nodePath.remove();
                        return;
                    }

                    if (startsWith(node.source.value, CWD_PREFIX)) {
                        node.source.value = cwd + '/src/app' + node.source.value.slice(CWD_PREFIX.length);
                    }
                }

            },
            IfStatement(nodePath, pluginPass){
                nodePath.traverse(Visitor_if_statement)
            }
        }
    }
}
