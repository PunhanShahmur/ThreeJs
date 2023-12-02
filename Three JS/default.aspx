<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="default.aspx.vb" Inherits="Three_JS._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;

        }
    </style>

    <form id="form1" runat="server">
        <div id="webgl">
        </div>
    </form>



    <script type="module">
        import * as THREE from 'https://threejs.org/build/three.module.js';
        import * as dat from 'https://cdn.skypack.dev/dat.gui';
        window.dat = dat
        window.THREE = THREE;
    </script>

    <script type="module" src="js/test.js"></script>
    <script src="js/three.js"></script>
</body>
</html>
