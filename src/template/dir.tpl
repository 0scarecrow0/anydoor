<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        body,html{
            margin: 0;
            padding: 0;
            background:white
        }
        div{
            margin: 30px 0 0 30px;
        }
        a{
            display: inline-block;
            width: 200px;
            height: 30px;
            margin: 10px;
            text-decoration:none;
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }
        a>span{
            margin-left: 10px;
            color:orangered
        }
    </style>
</head>
<body>
    <div>
        {{#each files}}
            <a href="{{../dir}}/{{file}}">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#{{iconobj.icon}}"></use>
                </svg>
                <span>
                    {{file}}
                </span>
            </a>
        {{/each}}
    </div>
</body>
<script src="{{cssPath}}"></script>
</html>